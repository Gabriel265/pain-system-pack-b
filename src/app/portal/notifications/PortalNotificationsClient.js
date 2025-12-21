'use client';
import React, { useState } from 'react';

export default function NotificationsPage() {
  const [filter, setFilter] = useState('all');
  
  const notifications = [
    { id: 1, type: 'success', unread: true, time: '2m ago' },
    { id: 2, type: 'info', unread: true, time: '15m ago' },
    { id: 3, type: 'warning', unread: false, time: '1h ago' },
    { id: 4, type: 'success', unread: false, time: '3h ago' },
    { id: 5, type: 'info', unread: false, time: '5h ago' },
    { id: 6, type: 'success', unread: false, time: '1d ago' },
    { id: 7, type: 'warning', unread: false, time: '2d ago' },
    { id: 8, type: 'info', unread: false, time: '3d ago' },
    { id: 9, type: 'success', unread: false, time: '5d ago' },
    { id: 10, type: 'info', unread: false, time: '1w ago' },
  ];

  const getIconColor = (type) => {
    switch(type) {
      case 'success': return 'bg-gradient-to-br from-orange-400 to-orange-600';
      case 'warning': return 'bg-gradient-to-br from-orange-500 to-orange-700';
      case 'info': return 'bg-gradient-to-br from-orange-300 to-orange-500';
      default: return 'bg-gradient-to-br from-orange-400 to-orange-600';
    }
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8">
      {/* Header Spacer */}
      <div className="h-16 md:h-20 lg:h-24"></div>
      
      {/* Header Section */}
      <div className="mb-6 md:mb-8 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Notifications
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-500 dark:text-gray-400">
              Stay updated with your latest activity
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2 sm:gap-3">
            <button className="px-3 py-2 sm:px-4 sm:py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
              Mark all read
            </button>
            <button className="px-3 py-2 sm:px-4 sm:py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors shadow-sm hover:shadow-md">
              Settings
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mt-6 flex gap-2 overflow-x-auto pb-2 border-b border-gray-200 dark:border-gray-800">
          {['all', 'unread', 'archived'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-all whitespace-nowrap ${
                filter === tab
                  ? 'text-orange-600 dark:text-orange-400 border-b-2 border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900/50'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3 md:space-y-4 max-w-4xl mx-auto pb-8">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`group relative bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-5 border transition-all duration-200 hover:shadow-lg hover:scale-[1.01] cursor-pointer ${
              notification.unread
                ? 'border-orange-200 dark:border-orange-900/50 bg-orange-50/30 dark:bg-orange-900/10'
                : 'border-gray-200 dark:border-gray-800 hover:border-orange-300 dark:hover:border-orange-800'
            }`}
          >
            <div className="flex gap-3 sm:gap-4">
              {/* Icon/Avatar */}
              <div className={`w-10 h-10 sm:w-12 sm:h-12 ${getIconColor(notification.type)} rounded-full flex-shrink-0 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow`}>
                <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white rounded-full"></div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 space-y-2 sm:space-y-2.5">
                {/* Title Placeholder */}
                <div className="flex items-start justify-between gap-2">
                  <div className="h-4 sm:h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
                  {notification.unread && (
                    <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 mt-1.5"></div>
                  )}
                </div>

                {/* Description Placeholders */}
                <div className="space-y-1.5">
                  <div className="h-3 sm:h-3.5 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
                  <div className="h-3 sm:h-3.5 bg-gray-200 dark:bg-gray-800 rounded w-11/12"></div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    {notification.time}
                  </span>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-xs sm:text-sm text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium">
                      View
                    </button>
                    <button className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Hover Border Effect */}
            <div className="absolute inset-0 rounded-xl border-2 border-orange-400 opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none"></div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="max-w-4xl mx-auto pb-8 text-center">
        <button className="px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 border border-gray-300 dark:border-gray-700 hover:border-orange-400 dark:hover:border-orange-600 rounded-lg transition-all duration-200 hover:shadow-md">
          Load More Notifications
        </button>
      </div>
    </div>
  );
}