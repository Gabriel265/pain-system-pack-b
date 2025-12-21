
"use client";

import { useState, useEffect } from "react";
import { format, subDays } from "date-fns";
import Link from "next/link";

export default function PortalDashboardClient() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch("/api/projects");
        if (res.ok) {
          const data = await res.json();
          setProjects(data);
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  // === REAL METRICS ===
  const total = projects.length;
  const Live = projects.filter(p => p.status === "Live").length;
  const inProgress = projects.filter(p => p.status === "In-Build").length;
  const Concept = projects.filter(p => p.status === "Concept").length;

  const categories = projects.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});

  const recent7Days = projects
    .filter(p => {
      const date = new Date(p.updatedAt || p.createdAt);
      return date > subDays(new Date(), 7);
    })
    .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt))
    .slice(0, 8);

  const topCategories = Object.entries(categories)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-xl text-gray-600 dark:text-gray-400">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Your project ecosystem at a glance</p>
      </div>

      {/* KPI Cards - Mobile Stacked, Desktop Grid */}
      <div className="max-w-7xl mx-auto mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center sm:text-left">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Projects</p>
          <p className="text-4xl font-bold mt-2">{total}</p>
          <p className="text-xs text-green-600 mt-1">{Live} Live</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center sm:text-left">
          <p className="text-sm text-gray-500 dark:text-gray-400">Live</p>
          <p className="text-4xl font-bold mt-2 text-green-600">{Live}</p>
          <p className="text-xs mt-1">Live & running</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center sm:text-left">
          <p className="text-sm text-gray-500 dark:text-gray-400">In Build</p>
          <p className="text-4xl font-bold mt-2 text-blue-600">{inProgress}</p>
          <p className="text-xs mt-1">Under development</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center sm:text-left">
          <p className="text-sm text-gray-500 dark:text-gray-400">Categories</p>
          <p className="text-4xl font-bold mt-2 text-purple-600">{Object.keys(categories).length}</p>
          <p className="text-xs mt-1 capitalize">{Object.keys(categories).join(", ")}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="max-w-7xl mx-auto mt-10 grid gap-8 lg:grid-cols-2">
        {/* Status Pie Chart (Inline SVG) */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-6">Project Status</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <div className="relative w-48 h-48">
              <svg viewBox="0 0 36 36" className="w-full h-full">
                {/* Live */}
                <circle
                  cx="18" cy="18" r="15.9"
                  fill="none" stroke="#10b981" strokeWidth="3.8"
                  strokeDasharray={`${(Live / total) * 100 || 0} 100`}
                  className="transition-all duration-1000"
                />
                {/* In Build */}
                <circle
                  cx="18" cy="18" r="15.9"
                  fill="none" stroke="#3b82f6" strokeWidth="3.8"
                  strokeDasharray={`${(inProgress / total) * 100 || 0} 100`}
                  strokeDashoffset={-(Live / total) * 100 || 0}
                  className="transition-all duration-1000"
                />
                {/* Concept */}
                <circle
                  cx="18" cy="18" r="15.9"
                  fill="none" stroke="#ef4444" strokeWidth="3.8"
                  strokeDasharray={`${(Concept / total) * 100 || 0} 100`}
                  strokeDashoffset={-((Live + inProgress) / total) * 100 || 0}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-3xl font-bold">{total}</p>
                  <p className="text-xs text-gray-500">Total</p>
                </div>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span>Live <strong className="ml-2">{Live}</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span>In Build <strong className="ml-2">{inProgress}</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span>Concept <strong className="ml-2">{Concept}</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Bar Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-6">Projects by Category</h2>
          <div className="space-y-4">
            {topCategories.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No projects yet</p>
            ) : (
              topCategories.map(([cat, count]) => (
                <div key={cat}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="capitalize font-medium">{cat}</span>
                    <span>{count}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-8">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        cat === "builder" ? "bg-orange-500" :
                        cat === "portal" ? "bg-purple-500" :
                        cat === "website" ? "bg-blue-500" :
                        cat === "app" ? "bg-green-500" : "bg-cyan-500"
                      }`}
                      style={{ width: `${(count / total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity + Projects Table */}
      <div className="max-w-7xl mx-auto mt-10 space-y-8">
        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Recent Activity (Last 7 Days)</h2>
          {recent7Days.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No recent activity</p>
          ) : (
            <div className="space-y-3">
              {recent7Days.map(p => (
                <div key={p.id} className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-0">
                  <div>
                    <p className="font-medium">{p.title || "Untitled Project"}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(p.updatedAt || p.createdAt).toLocaleDateString()} • {p.status}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {format(new Date(p.updatedAt || p.createdAt), "h:mm a")}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Projects Preview Table */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Latest Projects</h2>
            <Link
              href="/portal/projects"
              className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium rounded-xl hover:from-orange-600 hover:to-red-700 transition text-sm"
            >
              View All Projects →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="text-left py-3 px-2 font-medium">Title</th>
                  <th className="text-left py-3 px-2 font-medium hidden sm:table-cell">Category</th>
                  <th className="text-left py-3 px-2 font-medium">Status</th>
                  <th className="text-left py-3 px-2 font-medium hidden md:table-cell">Created</th>
                </tr>
              </thead>
              <tbody>
                {projects.slice(0, 6).map(p => (
                  <tr key={p.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="py-4 px-2 font-medium">{p.title || "Untitled"}</td>
                    <td className="py-4 px-2 hidden sm:table-cell">
                      <span className="px-3 py-1 text-xs rounded-full bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                        {p.category}
                      </span>
                    </td>
                    <td className="py-4 px-2">
                      <span className={`px-3 py-1 text-xs rounded-full ${
                        p.status === "Live" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" :
                        p.status === "In-Build" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" :
                        "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="py-4 px-2 text-gray-500 hidden md:table-cell">
                      {format(new Date(p.createdAt), "MMM d, yyyy")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}