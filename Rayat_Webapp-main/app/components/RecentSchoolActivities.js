"use client";
import React from "react";
import Image from "next/image";

export default function RecentActivities({ activities, onImageClick }) {
  const approvedActivities = activities.filter((activity) => activity.verify === 1);

  return (
    <div className="bg-gradient-to-r from-blue-100 via-white to-blue-200">
      <div className="max-w-6xl mx-auto mb-10 mt-10 bg-gradient-to-r from-blue-100 via-white to-blue-100 rounded-xl p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Recent Activities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {approvedActivities.length > 0 ? (
            approvedActivities.map((item, idx) => (
              <div
                key={idx}
                className="bg-white shadow-xl rounded-lg overflow-hidden p-4 hover:scale-105 cursor-pointer"
                onClick={() => onImageClick(item.file_path)}
              >
                <div className="relative w-full h-48">
                  <Image
                    src={item.file_path}
                    alt={item.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-center mt-4 font-semibold text-lg text-gray-800">
                  {item.title}
                </h3>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center w-full">No recent activities available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
