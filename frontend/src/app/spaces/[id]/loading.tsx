import React from 'react';

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery Skeleton */}
        <div className="space-y-4">
          <div className="h-[400px] bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>

        {/* Details Skeleton */}
        <div className="space-y-6">
          <div>
            <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
          </div>

          <div className="space-y-2">
            <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
          </div>

          <div className="space-y-2">
            <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
            <div className="grid grid-cols-2 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i}>
                  <div className="h-4 bg-gray-200 rounded w-20 animate-pulse mb-1"></div>
                  <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
            <div className="flex flex-wrap gap-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-8 bg-gray-200 rounded-full w-24 animate-pulse"></div>
              ))}
            </div>
          </div>

          <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>

      {/* Reviews Skeleton */}
      <div className="mt-12">
        <div className="h-8 bg-gray-200 rounded w-1/4 animate-pulse mb-6"></div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border-b pb-4">
              <div className="flex items-center mb-2">
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 