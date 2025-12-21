export default function VstMapClient() {
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header Spacer */}
      <div className="h-16 md:h-20 lg:h-24"></div>
      
      {/* Page Header */}
      <div className="max-w-7xl mx-auto mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3">
          Explore Our Map
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
          Discover locations, routes, and points of interest
        </p>
      </div>

      {/* Map Container */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
          {/* Map Placeholder */}
          <div className="w-full h-64 sm:h-96 lg:h-[600px] xl:h-[700px] flex flex-col items-center justify-center p-6">
            <div className="text-center space-y-3 sm:space-y-4">
              {/* Icon Placeholder */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto bg-orange-500 dark:bg-orange-600 rounded-full flex items-center justify-center opacity-20 transition-opacity duration-300 hover:opacity-30">
                <svg 
                  className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                  />
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                  />
                </svg>
              </div>
              
              {/* Text Content */}
              <div>
                <p className="text-xl sm:text-2xl lg:text-4xl font-semibold text-gray-500 dark:text-gray-400">
                  Map View
                </p>
                <p className="text-sm sm:text-base lg:text-lg text-gray-400 dark:text-gray-500 mt-2">
                  Your interactive map will be displayed here
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Map Controls/Info (Optional) */}
        <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-5 shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
            <h3 className="text-base sm:text-lg font-semibold mb-2 text-orange-500 dark:text-orange-600">
              Feature One
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Description of map feature or capability
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-5 shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
            <h3 className="text-base sm:text-lg font-semibold mb-2 text-orange-500 dark:text-orange-600">
              Feature Two
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Description of map feature or capability
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-5 shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg sm:col-span-2 lg:col-span-1">
            <h3 className="text-base sm:text-lg font-semibold mb-2 text-orange-500 dark:text-orange-600">
              Feature Three
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Description of map feature or capability
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}