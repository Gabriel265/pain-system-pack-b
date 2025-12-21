'use client';
import { Search } from 'lucide-react';

export default function VstSearchClient() {
  const handleSearch = () => {
    window.location.href = '/vst/results';
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8">
      {/* Header Spacer */}
      <div className="h-16 md:h-20 lg:h-24"></div>
      
      {/* Main Content Container */}
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
        
        {/* Page Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
          Discover Content
        </h1>
        
        {/* Search Bar */}
        <div className="max-w-3xl">
          <div className="relative group">
            <input
              type="text"
              placeholder="Search for anything..."
              className="w-full h-12 sm:h-14 px-5 pr-12 bg-gray-100 dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-800 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none transition-all duration-300 text-sm sm:text-base"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button
              onClick={handleSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-orange-500 hover:bg-orange-600 transition-colors duration-200"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
        
        {/* Results Grid */}
        <div className="grid gap-4 sm:gap-5 lg:gap-6">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i} 
              className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 p-5 sm:p-6 lg:p-7 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-orange-500 dark:hover:border-orange-500 transition-all duration-300 hover:shadow-lg cursor-pointer group"
            >
              {/* Title Placeholder */}
              <div className="h-5 sm:h-6 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600 rounded-lg w-2/3 sm:w-1/2 group-hover:from-orange-400 group-hover:to-orange-500 transition-all duration-300"></div>
              
              {/* Description Placeholders */}
              <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-md w-5/6"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-md w-3/4"></div>
              </div>
              
              {/* Metadata Placeholder */}
              <div className="mt-4 flex items-center gap-3 flex-wrap">
                <div className="h-3 w-16 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                <div className="h-3 w-20 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                <div className="h-3 w-24 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom Spacer */}
        <div className="h-8 sm:h-12"></div>
      </div>
    </div>
  );
}