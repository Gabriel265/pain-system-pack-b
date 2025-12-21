export default function VstResultsClient() {
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header Spacer */}
      <div className="h-16 md:h-20 lg:h-24"></div>
      
      {/* Page Header */}
      <div className="max-w-7xl mx-auto mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
              Search Results
            </h1>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
              Found 9 items matching your criteria
            </p>
          </div>
          
          {/* Filter/Sort Controls */}
          <div className="flex gap-3">
            <button className="px-4 py-2 text-sm sm:text-base bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
              Filter
            </button>
            <button className="px-4 py-2 text-sm sm:text-base bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
              Sort
            </button>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {[...Array(9)].map((_, i) => (
            <div 
              key={i} 
              className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
            >
              {/* Image Placeholder */}
              <div className="relative bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 h-48 sm:h-52 lg:h-56 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-orange-500 dark:bg-orange-600 rounded-full flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity duration-300">
                    <svg 
                      className="w-8 h-8 text-white" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                      />
                    </svg>
                  </div>
                </div>
                
                {/* Badge */}
                <div className="absolute top-3 right-3 bg-orange-500 dark:bg-orange-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-lg">
                  New
                </div>
              </div>
              
              {/* Content */}
              <div className="p-4 sm:p-5 space-y-3 sm:space-y-4">
                {/* Title Placeholder */}
                <div className="space-y-2">
                  <div className="h-5 bg-gradient-to-r from-gray-300 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded animate-pulse"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded w-11/12 animate-pulse"></div>
                </div>
                
                {/* Description Placeholder */}
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
                </div>
                
                {/* Action Button */}
                <button className="w-full h-10 sm:h-11 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] Live:scale-[0.98]">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-8 sm:mt-10 flex justify-center">
          <button className="px-6 sm:px-8 py-3 sm:py-3.5 bg-white dark:bg-gray-800 border-2 border-orange-500 dark:border-orange-600 text-orange-500 dark:text-orange-600 font-semibold rounded-lg hover:bg-orange-50 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 Live:scale-95 shadow-md">
            Load More Results
          </button>
        </div>
      </div>
    </div>
  );
}