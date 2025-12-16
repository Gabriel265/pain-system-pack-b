// src/components/common/Sidebar.js
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Home, FolderOpen, Bell, Hammer, Search, MapPin, Shield, X, LogOut, ChevronDown, ChevronRight 
} from "lucide-react";
import { useState, useEffect } from "react";

const adminLinks = [
  { href: "/admin/projects", label: "Projects", icon: FolderOpen },
  { divider: true },
  { href: "/portal/dashboard", label: "Portal Dashboard", icon: Home },
  { divider: true },
  { href: "/automation/projects-builder", label: "Projects Builder", icon: Hammer },
  { divider: true },
  { href: "/automation/vst-website-automation", label: "VST Home", icon: Home },
];

const builderLinks = [
  { href: "/admin/projects", label: "Admin Projects", icon: FolderOpen },
  { divider: true },
  { href: "/automation/vst-website-automation", label: "VST Home", icon: Home },
  { divider: true },
  { href: "/portal/dashboard", label: "Portal Dashboard", icon: Home },
];

const portalLinks = [
  { href: "/portal/dashboard", label: "Dashboard", icon: Home },
  { href: "/portal/projects", label: "My Projects", icon: FolderOpen },
  { href: "/portal/notifications", label: "Notifications", icon: Bell },
  { href: "/portal/builder", label: "Builder", icon: Hammer },
  { divider: true },
  { href: "/admin/projects", label: "Admin Projects", icon: FolderOpen },
  { divider: true },
  { href: "/automation/vst-website-automation", label: "VST Home", icon: Home },
  { divider: true },
  { href: "/automation/projects-builder", label: "Projects Builder", icon: Hammer },
];

const vstLinks = [
  { href: "/automation/vst-website-automation", label: "Home", icon: Home },
  { href: "/automation/vst-website-automation/search", label: "Search", icon: Search },
  { href: "/automation/vst-website-automation/results", label: "Results", icon: FolderOpen },
  { href: "/automation/vst-website-automation/map", label: "Map", icon: MapPin },
  { href: "/automation/vst-website-automation/safety", label: "Safety", icon: Shield },
  { divider: true },
  { href: "/admin/projects", label: "Admin Panel", icon: FolderOpen },
  { divider: true },
  { href: "/portal/dashboard", label: "Portal", icon: Home },
  { divider: true },
  { href: "/automation/projects-builder", label: "Projects Builder", icon: Hammer },
];


export default function Sidebar({ type }) {
  const pathname = usePathname();
  const router = useRouter();

  const links = 
    type === "portal" ? portalLinks :
    type === "vst" ? vstLinks :
    type === "builder" ? builderLinks :
    type === "admin" ? adminLinks : [];

  // Mobile menu open state
  const [isOpen, setIsOpen] = useState(false);
  // Desktop collapsible state
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Escape key to close mobile menu
  useEffect(() => {
    if (isOpen) {
      const handleEscape = (e) => e.key === "Escape" && setIsOpen(false);
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen]);

  const handleLogout = () => {
    document.cookie = 'user_role=; path=/; max-age=0';
    router.push('/');
  };

  // Dynamic title based on current section
  const getTitle = () => {
    if (pathname.startsWith("/admin")) return "Admin Panel";
    if (pathname.startsWith("/portal")) return "Pain Portal";
    if (pathname.startsWith("vst-website-automation")) return "VST System";
    if (pathname.startsWith("project-builder")) return "Projects Builder";
    return "Menu";
  };

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
          transform transition-all duration-300 ease-in-out flex flex-col
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:relative lg:translate-x-0 lg:z-auto
          ${isCollapsed ? "lg:w-20" : "lg:w-72"}
        `}
      >
        <div className="flex flex-col h-full">

          {/* Header Spacer */}
          <div className="h-16 md:h-20 lg:h-24"></div>

          {/* Collapsible Header */}
          <div 
            className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800 cursor-pointer select-none"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <div className={`flex items-center gap-3 transition-all ${isCollapsed ? "justify-center" : ""}`}>
              {isCollapsed ? (
                <ChevronRight className="w-6 h-6 text-orange-600" />
              ) : (
                <ChevronDown className="w-6 h-6 text-orange-600" />
              )}
              {!isCollapsed && (
                <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
                  {getTitle()}
                </h1>
              )}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className={`flex-1 p-4 space-y-1 overflow-y-auto ${isCollapsed ? "px-3" : ""}`}>
            {links.map((link, index) => {
              if (link.divider) {
                return (
                  <div key={`divider-${index}`} className="my-4 border-t border-gray-200 dark:border-gray-700" />
                );
              }

              const Icon = link.icon;
              const isActive = pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    flex items-center rounded-lg transition-all duration-200 group
                    ${isCollapsed ? "justify-center px-3" : "px-4 gap-3"}
                    ${isActive
                      ? "bg-orange-500 text-white shadow-md"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }
                  `}
                  title={isCollapsed ? link.label : ""}
                >
                  <div className={`py-3 ${isCollapsed ? "" : "flex items-center gap-3 w-full"}`}>
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && <span className="font-medium">{link.label}</span>}
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Logout + Copyright */}
          <div className={`border-t border-gray-200 dark:border-gray-800 p-4 space-y-4 ${isCollapsed ? "px-3" : ""}`}>
            <button
              onClick={handleLogout}
              className={`
                w-full flex items-center rounded-lg text-red-600 dark:text-red-400
                hover:bg-red-50 dark:hover:bg-red-900/20 transition-all font-medium
                ${isCollapsed ? "justify-center px-3" : "px-4 gap-3"}
              `}
              title={isCollapsed ? "Logout" : ""}
            >
              <div className="py-3 flex items-center gap-3">
                <LogOut className="w-5 h-5" />
                {!isCollapsed && <span>Logout</span>}
              </div>
            </button>

            {!isCollapsed && (
              <p className="text-xs text-gray-500 text-center">
                © 2025 The Pain System
              </p>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Floating Button */}
      <MobileMenuButton isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
    </>
  );
}

// Mobile FAB
export function MobileMenuButton({ isOpen, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="lg:hidden fixed bottom-6 right-6 z-50 bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 Live:scale-95"
      aria-label="Toggle menu"
    >
      {isOpen ? (
        <X className="w-7 h-7" />
      ) : (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      )}
    </button>
  );
}