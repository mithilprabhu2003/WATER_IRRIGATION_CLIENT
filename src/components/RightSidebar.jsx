import React, { useState, useEffect } from 'react';

function RightSidebar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // Update every second

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  // Example usage percentage (this could be passed as a prop or fetched from API)
  const usagePercentage = 60;

  return (
    <div className="flex justify-center flex-col items-center w-1/2 h-[calc(100vh-120px)] bg-gray-100 p-4 rounded-md shadow-lg">
      <h1 className="text-2xl font-bold text-gray-700 mb-2">USAGE</h1>
      <p className="text-gray-500 mb-4">
        {currentDate.toLocaleDateString()} {currentDate.toLocaleTimeString()}
      </p>

      <div className="relative h-[550px] w-12 rounded-lg bg-gray-300">
        <div
          className="absolute bottom-0 left-0 w-full rounded-lg bg-gradient-to-t from-purple-500 to-purple-300 transition-all duration-300"
          style={{ height: `${usagePercentage}%` }}
        ></div>
      </div>
      <p className="text-gray-700 mt-4 font-semibold">{usagePercentage}%</p>
    </div>
  );
}

export default RightSidebar;
