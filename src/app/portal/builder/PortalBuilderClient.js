// src/app/portal/builder/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { nanoid } from 'nanoid';
import toast, { Toaster } from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';

export default function PortalBuilderClient() {
  const router = useRouter();

  // Get project from URL (e.g. ?edit=abc123) or create new
  const urlParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const editId = urlParams.get('edit');

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    status: 'In-Build',
    category: 'portal',
  });

  // Auto-generate slug when title changes (only on create)
  useEffect(() => {
    if (!isEditing && formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        .replace(/-+/g, '-');
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.title, isEditing]);

  // Load existing project if editing
  useEffect(() => {
    if (editId) {
      const loadProject = async () => {
        try {
          const res = await fetch(`/api/projects?id=${editId}`);
          if (res.ok) {
            const project = await res.json();
            setFormData({
              title: project.title || '',
              slug: project.slug || '',
              description: project.description || '',
              status: project.status || 'In-Build',
              category: project.category || 'website',
            });
            setIsEditing(true);
          } else {
            toast.error('Project not found');
            router.push('/portal/builder');
          }
        } catch {
          toast.error('Failed to load project');
        } finally {
          setLoading(false);
        }
      };
      loadProject();
    } else {
      setLoading(false);
    }
  }, [editId, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.slug.trim() || !formData.description.trim()) {
      toast.error('Title, slug, and description are required');
      return;
    }

    const payload = {
      ...formData,
      id: isEditing ? editId : nanoid(),
      updatedAt: new Date().toISOString(),
      ...(isEditing ? {} : { createdAt: new Date().toISOString() }),
    };

    try {
      const res = await fetch('/api/projects', {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(isEditing ? 'Project updated!' : 'Project created!');
        router.push('/admin/projects');
      } else {
        const error = await res.text();
        toast.error(error || 'Failed to save');
      }
    } catch {
      toast.error('Network error');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8 max-w-4xl">

          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => router.push('/admin/projects')}
              className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Projects
            </button>
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
              {isEditing ? 'Edit Project' : 'Create New Project'}
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Project Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
                className="w-full px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-orange-500 transition text-lg font-medium"
                placeholder="My Awesome Project"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Slug {isEditing && '(cannot change when editing)'}
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                required
                readOnly={isEditing}
                className="w-full px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 font-mono text-sm focus:ring-2 focus:ring-orange-500 transition disabled:opacity-70"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={8}
                required
                className="w-full px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-orange-500 resize-none transition"
                placeholder="Describe your project..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-orange-500"
                >
                  <option value="Live">Live (Published)</option>
                  <option value="In-Build">In Build</option>
                  <option value="Concept">Concept</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-orange-500"
                >
                  <option value="portal">Portal</option>
                  <option value="website">Website</option>
                  <option value="app">App</option>
                  <option value="builder">Builder</option>
                  <option value="system">System</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-5 rounded-xl text-lg shadow-xl transition transform hover:scale-105"
              >
                {isEditing ? 'Update Project' : 'Create Project'}
              </button>
              <button
                type="button"
                onClick={() => router.push('/admin/projects')}
                className="px-8 py-5 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}