//app/SkeletonScreen.jsx

import React from "react";

const SkeletonScreen = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white shadow-sm">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-200 rounded-md animate-pulse"></div>
          <div className="w-24 h-6 ml-2 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="flex space-x-2">
          <div className="w-16 h-8 bg-blue-200 rounded animate-pulse"></div>
          <div className="w-16 h-8 bg-blue-200 rounded animate-pulse"></div>
        </div>
      </header>

      {/* Main content */}
      <main className="container px-4 mx-auto mt-8">
        <div className="flex flex-col items-center md:flex-row">
          {/* Image placeholder */}
          <div className="w-full h-64 bg-gray-300 rounded-lg md:w-1/2 md:h-96 animate-pulse"></div>

          {/* Text content placeholder */}
          <div className="w-full mt-4 md:w-1/2 md:mt-0 md:ml-8">
            <div className="w-3/4 h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-full h-6 mt-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-5/6 h-6 mt-2 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SkeletonScreen;
