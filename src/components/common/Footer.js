'use client';

import { TrendingUp, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
    { name: "Projects", href: "/website/projects" },
    { name: "Accessbility", href: "/website/accessibility-&-inclusion" },
    { name: "About", href: "/website/about" },
    { name: "Services", href: "/website/services" },
    { name: "Contact", href: "/website/contact" },
    ],
    services: [
      { name: "Title-1", href: "#" },
      { name: "Title-2", href: "#" },
      { name: "Title-3", href: "#" },
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
      { name: "Security", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-background to-gray-50 dark:to-gray-900 border-t border-gray-200 ">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Newsletter Section */}
        <div className="mb-16 pb-16 border-b border-gray-200 ">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                Stay Updated
              </h3>
              <p className="text-gray-600 ">
                Subscribe to our newsletter for the latest insights and updates.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full border border-gray-300  bg-white  text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button className="inline-flex items-center justify-center px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full transition transform hover:scale-105 whitespace-nowrap">
                Subscribe <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center space-x-2 mb-6">
              <TrendingUp className="w-8 h-8 text-orange-500" />
              <span className="text-xl font-bold text-gray-800">
                Website Name
              </span>
            </a>
            <p className="text-gray-600  mb-6 leading-relaxed">
              Description
            </p>
            <div className="space-y-3">
              <a href="mailto:hello@thepainsystem.com" className="flex items-center text-gray-600  hover:text-orange-500 transition">
                <Mail className="w-4 h-4 mr-3" />
               Email
              </a>
              <a href="#" className="flex items-center text-gray-600  hover:text-orange-500 transition">
                <Phone className="w-4 h-4 mr-3" />
                Phone Number
              </a>
              <div className="flex items-start text-gray-600 ">
                <MapPin className="w-4 h-4 mr-3 mt-1 flex-shrink-0" />
                <span>Street<br />Address</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-bold text-gray-800 mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-600  hover:text-orange-500 transition">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-800 mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-600  hover:text-orange-500 transition">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-800 mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-600  hover:text-orange-500 transition">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 ">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-600  text-sm text-center md:text-left">
              © {currentYear} The Pain System. All rights reserved.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2 rounded-full bg-gray-100  hover:bg-orange-500 dark:hover:bg-orange-500 text-gray-600  hover:text-white transition-all transform hover:scale-110"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bottom gradient */}
      <div className="h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500" />
    </footer>
  );
}