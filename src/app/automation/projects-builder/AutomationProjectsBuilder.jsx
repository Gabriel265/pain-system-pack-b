'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { nanoid } from 'nanoid';
import toast, { Toaster } from 'react-hot-toast';
import { format } from 'date-fns';
import {
  Search,
  Edit,
  Trash2,
  Globe,
  CheckSquare,
  Square,
  Calendar,
  Clock,
  Plus,
  FileText,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

export default function AutomationProjectsBuilder() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    status: 'In-Build',
    category: 'builder',
  });
  const [loading, setLoading] = useState(true);
  const [isTableCollapsed, setIsTableCollapsed] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Change this to show more/fewer per page

  const router = useRouter();

  // Auto-generate slug
  useEffect(() => {
    if (formData.title && !editingProject?.id) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        .replace(/-+/g, '-');
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.title, editingProject?.id]);

  // Fetch projects
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/projects?limit=1000');
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
        setFilteredProjects(data);
      } else {
        toast.error('Failed to load projects');
      }
    } catch {
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  // Search filter
  useEffect(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) {
      setFilteredProjects(projects);
      return;
    }
    const filtered = projects.filter(p =>
      p.title?.toLowerCase().includes(query) ||
      p.slug?.toLowerCase().includes(query) ||
      p.description?.toLowerCase().includes(query) ||
      p.category?.toLowerCase().includes(query) ||
      p.status?.toLowerCase().includes(query)
    );
    setFilteredProjects(filtered);
    setCurrentPage(1); // Reset to first page on search
  }, [searchQuery, projects]);

  // Pagination logic
  const totalItems = filteredProjects.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.slug.trim() || !formData.description.trim()) {
      toast.error('Title, slug, and description are required');
      return;
    }

    const payload = {
      ...formData,
      id: editingProject?.id || nanoid(),
      updatedAt: new Date().toISOString(),
      ...(editingProject ? {} : { createdAt: new Date().toISOString() }),
    };

    const res = await fetch('/api/projects', {
      method: editingProject ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      toast.success(editingProject ? 'Updated!' : 'Created!');
      fetchProjects();
      setFormData({ title: '', slug: '', description: '', status: 'In-Build', category: 'website' });
      setEditingProject(null);
      setIsEditorOpen(false);
    } else {
      toast.error('Failed to save');
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title || '',
      slug: project.slug || '',
      description: project.description || '',
      status: project.status || 'In-Build',
      category: project.category || 'website',
    });
    setIsEditorOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete permanently?')) return;
    const res = await fetch(`/api/projects?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      toast.success('Deleted');
      fetchProjects();
      setSelectedIds(prev => { const n = new Set(prev); n.delete(id); return n; });
    }
  };

  const handleToggleStatus = async (project) => {
    const newStatus = project.status === 'Live' ? 'Concept' : 'Live';
    const res = await fetch('/api/projects', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...project, status: newStatus }),
    });
    if (res.ok) {
      toast.success(newStatus === 'Live' ? 'Published' : 'Unpublished');
      fetchProjects();
    }
  };

  const bulkAction = async (action) => {
    if (selectedIds.size === 0) return;
    if (!confirm(`Apply "${action}" to ${selectedIds.size} projects?`)) return;

    for (const id of selectedIds) {
      const project = projects.find(p => p.id === id);
      if (!project) continue;

      if (action === 'delete') {
        await fetch(`/api/projects?id=${id}`, { method: 'DELETE' });
      } else if (action === 'publish') {
        await fetch('/api/projects', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...project, status: 'Live' }) });
      } else if (action === 'unpublish') {
        await fetch('/api/projects', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...project, status: 'Concept' }) });
      }
    }
    toast.success(`Bulk ${action} completed`);
    setSelectedIds(new Set());
    fetchProjects();
  };

  const toggleSelect = (id) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const selectAll = () => {
    if (selectedIds.size === currentProjects.length && currentProjects.length > 0) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(currentProjects.map(p => p.id)));
    }
  };

  const formatDate = (d) => d ? format(new Date(d), 'MMM d, yyyy') : '—';
  const formatDateTime = (d) => d ? format(new Date(d), 'MMM d, yyyy • h:mm a') : '—';

  //table column resizing
const [colWidths, setColWidths] = useState({
  select: 48,
  title: 100,
  slug: 100,
  description: 100,
  status: 80,
  category: 100,
  created: 100,
  updated: 100,
  actions: 110,
});


//resize handler

const startResize = (key, startX) => {
  const startWidth = colWidths[key];

  const onMouseMove = (e) => {
    const delta = e.clientX - startX;

    setColWidths((prev) => {
      const next = {
        ...prev,
        [key]: Math.max(80, startWidth + delta),
      };

      return next;
    });
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', () => {
    document.removeEventListener('mousemove', onMouseMove);
    document.body.style.cursor = 'col-resize';
document.body.style.userSelect = 'none';
document.body.style.cursor = '';
document.body.style.userSelect = '';


  }, { once: true });
};

  return (
    <>
      <Toaster position="top-right" />

      <div
  className="
    px-4 py-8
    sm:px-6
    lg:px-8 lg:py-12
    w-full
    max-w-none
    overflow-x-hidden
  "
>
        {/* Header Space */}
      <div className="h-16 md:h-20"></div>
        {/* Page Title */}
        <div className="mb-10">
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
            Projects • Builder
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage all your projects</p>
        </div>

        <div className="space-y-8">

          {/* Editor Panel */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
            <div 
              className="px-6 py-5 border-b border-gray-200 dark:border-gray-700 cursor-pointer select-none flex items-center justify-between"
              onClick={() => setIsEditorOpen(!isEditorOpen)}
            >
              <div className="flex items-center gap-3">
                {isEditorOpen ? <ChevronDown className="w-5 h-5 text-orange-600" /> : <ChevronRight className="w-5 h-5 text-orange-600" />}
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {isEditorOpen ? (editingProject ? 'Edit Project' : 'Create New Project') : 'Project Editor'}
                </h2>
              </div>
              {!isEditorOpen && (
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsEditorOpen(true); setEditingProject(null); setFormData({ title: '', slug: '', description: '', status: 'In-Build', category: 'website' }); }}
                  className="text-sm font-medium text-orange-600 hover:text-orange-700"
                >
                  + New Project
                </button>
              )}
            </div>

            {isEditorOpen && (
              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <input type="text" placeholder="Project Title *" value={formData.title} onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))} required className="w-full px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-orange-500 transition" />
                  <input type="text" placeholder="Slug (auto-generated)" value={formData.slug} onChange={e => setFormData(prev => ({ ...prev, slug: e.target.value }))} required className="w-full px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 font-mono text-sm focus:ring-2 focus:ring-orange-500 transition" />
                  <textarea placeholder="Description *" value={formData.description} onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))} rows={5} required className="w-full px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-orange-500 resize-none transition" />
                  <div className="grid grid-cols-2 gap-4">
                    <select value={formData.status} onChange={e => setFormData(prev => ({ ...prev, status: e.target.value }))} className="px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                      <option value="Live">Live</option>
                      <option value="In-Build">In Build</option>
                      <option value="Concept">Concept</option>
                    </select>
                    <select value={formData.category} onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))} className="px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                      <option value="builder">Builder</option>
                      <option value="website">Website</option>
                      <option value="portal">Portal</option>
                      <option value="app">App</option>
                                            <option value="system">System</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-5 rounded-xl text-lg shadow-xl transition transform hover:scale-105 flex items-center justify-center gap-3">
                    {editingProject ? 'Update Project' : 'Create Project'}
                  </button>
                  <button type="button" onClick={() => { setIsEditorOpen(false); setEditingProject(null); setFormData({ title: '', slug: '', description: '', status: 'In-Build', category: 'website' }); }} className="w-full text-center text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                    Cancel
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Projects Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
            <div 
              className="px-6 py-5 border-b border-gray-200 dark:border-gray-700 cursor-pointer select-none flex items-center justify-between"
              onClick={() => setIsTableCollapsed(!isTableCollapsed)}
            >
              <div className="flex items-center gap-3">
                {isTableCollapsed ? <ChevronRight className="w-5 h-5 text-orange-600" /> : <ChevronDown className="w-5 h-5 text-orange-600" />}
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Projects ({totalItems})
                </h2>
              </div>
            </div>

            {!isTableCollapsed && (
              <div className="p-6 space-y-6">

                {/* Search + Bulk Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                  <div className="relative w-full sm:max-w-md">
                    <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                    <input type="text" placeholder="Search projects..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-orange-500 transition" />
                  </div>
                  {selectedIds.size > 0 && (
                    <div className="flex flex-wrap gap-3">
                      <button onClick={() => bulkAction('publish')} className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium flex items-center gap-2">
                        Publish ({selectedIds.size})
                      </button>
                      <button onClick={() => bulkAction('unpublish')} className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium">
                        Unpublish
                      </button>
                      <button onClick={() => bulkAction('delete')} className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium flex items-center gap-2">
                        Delete
                      </button>
                    </div>
                  )}
                </div>

                {/* Desktop: Responsive Table */}
<div className="hidden lg:block relative">
  <div className="overflow-x-auto overscroll-x-contain max-h-[70vh]">
    <div className="w-full align-middle">
  <table
  className="
    w-full
    table-fixed
    border-collapse
    divide-y divide-gray-200 dark:divide-gray-700
  "
>     <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0 z-20 shadow-sm">
      <tr>
          <th className="w-12 px-3 py-4">
            <button onClick={selectAll}>
              {selectedIds.size === currentProjects.length && currentProjects.length > 0 ? 
                <CheckSquare className="w-5 h-5 text-orange-600" /> : 
                <Square className="w-5 h-5 text-gray-400" />
              }
            </button>
          </th>
        <th
  style={{ width: colWidths.title }}
  className="relative px-3 py-4 text-left font-semibold"
>
  Title
  <span
    onMouseDown={(e) => startResize('title', e.clientX)}
    className="absolute right-0 top-0 h-full w-1 cursor-col-resize bg-black/20"
  />
</th>


          {/* Slug */}
  <th
    style={{ width: colWidths.slug }}
    className="relative px-3 py-4 text-left font-semibold"
  >
    Slug
    <span
      onMouseDown={(e) => startResize('slug', e.clientX)}
      className="absolute right-0 top-0 h-full w-1 cursor-col-resize bg-black/20"
    />
  </th>
          <th
  style={{ width: colWidths.description }}
  className="relative px-3 py-4 text-left font-semibold"
>

  Description
  <span
    onMouseDown={(e) => startResize('description', e.clientX)}
    className="absolute right-0 top-0 h-full w-1 cursor-col-resize bg-black/20"
  />
</th>


          {/* Status */}
  <th
    style={{ width: colWidths.status }}
    className="relative px-3 py-4 text-left font-semibold"
  >
    Status
    <span
      onMouseDown={(e) => startResize('status', e.clientX)}
      className="absolute right-0 top-0 h-full w-1 cursor-col-resize bg-black/20"
    />
  </th>
          {/* Category */}
  <th
    style={{ width: colWidths.category }}
    className="relative px-3 py-4 text-left font-semibold"
  >
    Category
    <span
      onMouseDown={(e) => startResize('category', e.clientX)}
      className="absolute right-0 top-0 h-full w-1 cursor-col-resize bg-black/20"
    />
  </th>

  {/* Created */}
  <th
    style={{ width: colWidths.created }}
    className="relative px-3 py-4 text-left font-semibold"
  >
    Created
    <span
      onMouseDown={(e) => startResize('created', e.clientX)}
      className="absolute right-0 top-0 h-full w-1 cursor-col-resize bg-black/20"
    />
  </th>

  {/* Updated */}
  <th
    style={{ width: colWidths.updated }}
    className="relative px-3 py-4 text-left font-semibold"
  >
    Updated
    <span
      onMouseDown={(e) => startResize('updated', e.clientX)}
      className="absolute right-0 top-0 h-full w-1 cursor-col-resize bg-black/20"
    />
  </th>

  {/* Actions */}
  <th
    style={{ width: colWidths.actions }}
    className="relative px-3 py-4 text-right font-semibold"
  >
    Actions
    <span
      onMouseDown={(e) => startResize('actions', e.clientX)}
      className="absolute right-0 top-0 h-full w-1 cursor-col-resize bg-black/20"
    />
  </th>
        </tr>
    </thead>
    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
      {loading ? (
        <tr><td colSpan={9} className="text-center py-16 text-gray-500">Loading...</td></tr>
      ) : currentProjects.length === 0 ? (
        <tr><td colSpan={9} className="text-center py-16 text-gray-500">No projects found</td></tr>
      ) : (
        currentProjects.map(project => (
          <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
            <td className="px-4 py-4">
              <button onClick={() => toggleSelect(project.id)}>
                {selectedIds.has(project.id) ? 
                  <CheckSquare className="w-5 h-5 text-orange-600" /> : 
                  <Square className="w-5 h-5 text-gray-400" />
                }
              </button>
            </td>
            <td className="px-4 py-4 font-medium text-gray-900 dark:text-gray-100 truncate max-w-64">
              {project.title || 'Untitled'}
            </td>
            <td className="px-4 py-4 text-sm font-mono text-gray-600 dark:text-gray-400 truncate max-w-48">
              /{project.slug || '—'}
            </td>
            <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="line-clamp-2 max-w-96">
                {project.description || 'No description'}
              </div>
            </td>
            <td className="px-4 py-4">
              <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                project.status === 'Live' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                project.status === 'In-Build' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 
                'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
              }`}>
                {project.status || 'Concept'}
              </span>
            </td>
            <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-400 capitalize">
              {project.category || '—'}
            </td>
            <td className="px-4 py-4 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
              {formatDate(project.createdAt)}
            </td>
            <td className="px-4 py-4 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
              {formatDateTime(project.updatedAt)}
            </td>
            <td className="px-4 py-4 text-right">
              <div className="inline-flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1.5">
                <button onClick={() => handleEdit(project)} className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 rounded transition"><Edit className="w-4 h-4" /></button>
                <button onClick={() => handleToggleStatus(project)} className="p-2 text-orange-600 hover:bg-orange-100 dark:hover:bg-orange-900 rounded transition"><Globe className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(project.id)} className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded transition"><Trash2 className="w-4 h-4" /></button>
              </div>
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
</div>
</div>
</div>

                {/* Mobile: Cards */}
                <div className="lg:hidden space-y-4">
                  {loading ? (
                    <div className="text-center py-12 text-gray-500">Loading projects...</div>
                  ) : currentProjects.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">No projects found</div>
                  ) : (
                    currentProjects.map(project => (
                      <div key={project.id} className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border ${selectedIds.has(project.id) ? 'border-orange-500' : 'border-gray-200 dark:border-gray-700'} transition-all`}>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <button onClick={() => toggleSelect(project.id)}>
                              {selectedIds.has(project.id) ? <CheckSquare className="w-6 h-6 text-orange-600" /> : <Square className="w-6 h-6 text-gray-400" />}
                            </button>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{project.title || 'Untitled'}</h3>
                          </div>
                        </div>

                        <div className="space-y-3 text-sm">
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <span className="font-mono">/{project.slug || '—'}</span>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 line-clamp-2">{project.description || 'No description'}</p>
                          <div className="flex flex-wrap gap-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${project.status === 'Live' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : project.status === 'In-Build' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}>
                              {project.status || 'Concept'}
                            </span>
                            <span className="text-gray-500 capitalize">{project.category || '—'}</span>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1"><Calendar className="w-4 h-4" />{formatDate(project.createdAt)}</div>
                            <div className="flex items-center gap-1"><Clock className="w-4 h-4" />{formatDateTime(project.updatedAt)}</div>
                          </div>
                        </div>

                        <div className="mt-4 flex justify-end gap-2">
                          <button onClick={() => handleEdit(project)} className="p-2.5 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition"><Edit className="w-4 h-4" /></button>
                          <button onClick={() => handleToggleStatus(project)} className="p-2.5 bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-800 transition"><Globe className="w-4 h-4" /></button>
                          <button onClick={() => handleDelete(project.id)} className="p-2.5 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Showing {startIndex + 1}–{Math.min(endIndex, totalItems)} of {totalItems} projects
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => goToPage(1)}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                      >
                        <ChevronsLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>

                      <div className="flex items-center gap-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }

                          return (
                            <button
                              key={pageNum}
                              onClick={() => goToPage(pageNum)}
                              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                                currentPage === pageNum
                                  ? 'bg-orange-500 text-white'
                                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                        {totalPages > 5 && currentPage < totalPages - 2 && (
                          <>
                            <span className="px-2 text-gray-500">...</span>
                            <button
                              onClick={() => goToPage(totalPages)}
                              className="px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                            >
                              {totalPages}
                            </button>
                          </>
                        )}
                      </div>

                      <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => goToPage(totalPages)}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                      >
                        <ChevronsRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}