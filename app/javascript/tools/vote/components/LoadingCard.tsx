import React from "react";

export default function LoadingCard(): JSX.Element {
  return (
    <div className="animate-pulse flex space-x-4 sm:space-x-8 p-4 sm:p-6 text-white bg-gray-900 rounded-2xl items-center sm:items-start">
      <div className="flex-grow flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-gray-600 to-gray-300" />
        <div className="flex-grow ">
          <div className="w-24 bg-gray-300 h-5 rounded-md mb-2" />
          <div className="w-48 bg-gray-600 h-4 rounded-md mb-4" />
          <div className="flex items-center space-x-2">
            <span className="w-12 bg-gray-600 h-2 rounded-md" />
            <span className="w-12 bg-gray-600 h-2 rounded-md" />
          </div>
        </div>
      </div>
      <div className="w-16 h-20 sm:w-16 sm:h-16 rounded-md bg-gray-800" />
    </div>
  );
}
