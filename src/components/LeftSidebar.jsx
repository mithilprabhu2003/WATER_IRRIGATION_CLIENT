import React, { useState, useEffect } from 'react';

function LeftSidebar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [usagePercentage, setUsagePercentage] = useState(69);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
      return () => clearInterval(interval); // Clear interval on component unmount
    }, 1000); // Update every second

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  

  return (
    <div className="flex justify-center col-span-1 flex-col items-center w-full h-[calc(100vh-100px)] bg-gray-100 p-4 rounded-md shadow-lg">
      <h1 className="text-2xl font-bold text-gray-700 mb-2">USAGE</h1>
      <p className="text-gray-500 mb-4">
        {currentDate.toLocaleDateString()} {currentDate.toLocaleTimeString()}
      </p>

      <div className="relative h-[80%] w-12 rounded-lg bg-gray-300">
        <div
          className="absolute bottom-0 left-0 w-full rounded-lg bg-gradient-to-t from-blue-500 to-blue-300 transition-all duration-300"
          style={{ height: `${usagePercentage}%` }}
        ></div>
      </div>
      <p className="text-gray-700 mt-4 font-semibold">{usagePercentage}%</p>
    </div>
  );
}

export default LeftSidebar;
