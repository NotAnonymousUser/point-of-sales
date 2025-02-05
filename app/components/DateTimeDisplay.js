"use client";
import React from 'react';
import { useDateTime } from '../hooks/useDateTime';

const DateTimeDisplay = () => {
  const { mounted, currentTime } = useDateTime();

  if (!mounted || !currentTime) {
    return <div className="flex items-center gap-4">Loading...</div>;
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col">
        <span className="text-sm text-gray-600 font-medium">Date:</span>
        <span className="text-base font-bold text-gray-800">
          {currentTime.date}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-sm text-gray-600 font-medium">Time:</span>
        <span className="text-base font-bold text-gray-800">
          {currentTime.time}
        </span>
      </div>
    </div>
  );
};

export default DateTimeDisplay; 