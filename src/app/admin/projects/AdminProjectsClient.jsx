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

export default function AdminProjectsClient() {
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
    category: 'website',
  });
  const [loading, setLoading] = useState(true);
  const [isTableCollapsed, setIsTableCollapsed] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Change this to show more/fewer per page

  const router = useRouter();

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
    document.removeEventListener('mouseup', onMouseMove);
  });
};

useEffect(() => {
  // Fetch projects data
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(data);
      setFilteredProjects(data);
    } catch (error) {
      toast.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  fetchProjects();
}, []);

// Handle search
const handleSearch = (e) => {
  setSearchQuery(e.target.value);
  const query = e.target.value.toLowerCase();
  setFilteredProjects(
    projects.filter((project) =>
      project.title.toLowerCase().includes(query)
    )
  );
};

// Handle project selection
const toggleSelect = (id) => {
  setSelectedIds((prev) => {
    const next = new Set(prev);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    return next;
  });
};

// Handle project editing
const handleEdit = (project) => {
  setEditingProject(project);
  setFormData(project);
  setIsEditorOpen(true);
};

// Handle project deletion
const handleDelete = async (id) => {
  try {
    await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });
    setProjects((prev) => prev.filter((project) => project.id !== id));
    setFilteredProjects((prev) => prev.filter((project) => project.id !== id));
    toast.success('Project deleted');
  } catch (error) {
    toast.error('Failed to delete project');
  }
};

// Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const method = editingProject ? 'PUT' : 'POST';
    const url = editingProject ? `/api/projects/${editingProject.id}` : '/api/projects';

    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (editingProject) {
      setProjects((prev) =>
        prev.map((project) =>
          project.id === editingProject.id ? formData : project
        )
      );
      setFilteredProjects((prev) =>
        prev.map((project) =>
          project.id === editingProject.id ? formData : project
        )
      );
      toast.success('Project updated');
    } else {
      const newProject = { ...formData, id: nanoid() };
      setProjects((prev) => [newProject, ...prev]);
      setFilteredProjects((prev) => [newProject, ...prev]);
      toast.success('Project created');
    }

    setIsEditorOpen(false);
    setEditingProject(null);
    setFormData({
      title: '',
      slug: '',
      description: '',
      status: 'In-Build',
      category: 'website',
    });
  } catch (error) {
    toast.error('Failed to save project');
  }
};

return (
  <div className="p-4 bg-black text-white min-h-screen">
    <Toaster />
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold">Projects</h1>
      <button
        className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
        onClick={() => setIsEditorOpen(true)}
      >
        <Plus className="inline-block mr-2" /> Add Project
      </button>
    </div>

    <div className="mb-4">
      <input
        type="text"
        placeholder="Search projects..."
        value={searchQuery}
        onChange={handleSearch}
        className="w-full p-2 rounded bg-gray-800 text-white placeholder-gray-400"
      />
    </div>

    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="p-2">Select</th>
            <th className="p-2">Title</th>
            <th className="p-2">Slug</th>
            <th className="p-2">Description</th>
            <th className="p-2">Status</th>
            <th className="p-2">Category</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects.map((project) => (
            <tr key={project.id} className="border-b border-gray-800 hover:bg-gray-900">
              <td className="p-2">
                <input
                  type="checkbox"
                  checked={selectedIds.has(project.id)}
                  onChange={() => toggleSelect(project.id)}
                  className="form-checkbox h-4 w-4 text-gray-600"
                />
              </td>
              <td className="p-2">{project.title}</td>
              <td className="p-2">{project.slug}</td>
              <td className="p-2">{project.description}</td>
              <td className="p-2">{project.status}</td>
              <td className="p-2">{project.category}</td>
              <td className="p-2">
                <button
                  className="text-blue-500 hover:text-blue-700 mr-2"
                  onClick={() => handleEdit(project)}
                >
                  <Edit className="inline-block" />
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(project.id)}
                >
                  <Trash2 className="inline-block" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {isEditorOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
        <div className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">{editingProject ? 'Edit Project' : 'Add Project'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-2 rounded bg-gray-200"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Slug</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full p-2 rounded bg-gray-200"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-2 rounded bg-gray-200"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full p-2 rounded bg-gray-200"
              >
                <option value="In-Build">In-Build</option>
                <option value="Live">Live</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-2 rounded bg-gray-200"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => setIsEditorOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </div>
);
}
