'use client';

import { useState, useEffect } from "react";
import { Menu, X, ArrowRight, TrendingUp, Sun, Moon } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDark, setIsDark] = useState(false);

  // THEME TOGGLE LOGIC
  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = saved ? saved === "true" : prefersDark;
    setIsDark(initial);
    if (initial) document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [isDark]);

  // Scroll hide/show
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      if (current > lastScrollY && current > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/website/projects" },
    { name: "About", href: "/website/about" },
    { name: "Services", href: "/website/services" },
    { name: "Contact", href: "/website/contact" },
  ];

  const ThemeToggle = () => (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle dark mode"
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-32 opacity-0"
      }`}
    >
      <div className="bg-background/90 backdrop-blur-xl shadow-2xl rounded-full border border-gray-200 dark:border-gray-700 px-4 sm:px-6 md:px-8">
        <div className="flex justify-between items-center h-16 gap-2 sm:gap-4 md:gap-6">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2 flex-shrink-0 min-w-0">
            <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 text-orange-500 flex-shrink-0" />
            <span className="text-base sm:text-xl font-bold text-foreground font-sans truncate">
              The Pain System
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-orange-500 font-medium transition"
              >
                {item.name}
              </a>
            ))}

            {/* Login Button */}
            <Link
              href="/login"
              className="inline-flex items-center px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full transition transform hover:scale-105"
            >
              Login <ArrowRight className="ml-2 w-4 h-4" />
            </Link>

           

            <ThemeToggle />
          </div>

          {/* Mobile Controls */}
          <div className="lg:hidden flex items-center gap-3 flex-shrink-0">
            <ThemeToggle />
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[90vw] max-w-sm bg-background/95 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-6 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block py-3 text-foreground hover:text-orange-500 font-medium text-center"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}

            {/* Login */}
            <Link
              href="/login"
              className="block w-full text-center py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}