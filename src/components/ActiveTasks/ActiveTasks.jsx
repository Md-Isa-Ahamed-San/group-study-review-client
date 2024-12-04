import React from 'react';
import {
    ArrowUpDown,
    Bell,
    Book,
    Home,
    Search,
    Settings,
    Star,
    ThumbsUp,
    User,
  } from "lucide-react";
const ActiveTasks = () => {
    const activeAssignments = [
        {
          id: 1,
          title: "Advanced Algorithms",
          dueDate: "2024-03-15",
          status: "Pending",
        },
        {
          id: 2,
          title: "Machine Learning Project",
          dueDate: "2024-03-18",
          status: "Submitted",
        },
        {
          id: 3,
          title: "Database Systems",
          dueDate: "2024-03-10",
          status: "Pending",
        },
        { id: 4, title: "Web Development", dueDate: "2024-03-20", status: "Pending" },
      ];
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4 text-teal-400">
              Active Tasks
            </h2>
            <div className="flex items-center mb-4 space-x-2">
              <input
                type="text"
                placeholder="Search active tasks..."
                className="flex-grow p-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                // value={activeSearch}
                // onChange={(e) => setActiveSearch(e.target.value)}
              />
              <button
                // onClick={toggleActiveSort}
                className="p-2 bg-gray-700 rounded-md hover:bg-gray-600 transition duration-300"
                // title={`Sort by due date (${
                //   activeSort.order === "asc" ? "Ascending" : "Descending"
                // })`}
              >
                <ArrowUpDown className="h-5 w-5 text-teal-400" />
              </button>
            </div>
            {activeAssignments.map((assignment) => (
              <div
                key={assignment.id}
                className="bg-gradient-to-br from-[#1F2A40] to-[#141B2D]  p-4 rounded-lg shadow-lg border border-gray-600"
              >
                <h3 className="font-semibold text-lg text-white">
                  {assignment.title}
                </h3>
                <p className="text-sm text-gray-400">
                  Due: {assignment.dueDate}
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <span
                    className={`text-sm px-2 py-1 rounded ${
                      assignment.status === "Submitted"
                        ? "bg-green-900 text-green-300"
                        : "bg-yellow-900 text-yellow-300"
                    }`}
                  >
                    {assignment.status}
                  </span>
                  <button className="px-4 py-1 rounded-md transition-all duration-300 bg-gradient-to-r from-blue-500/20 to-teal-500/20 border border-blue-500/50 text-blue-400">
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
    );
};

export default ActiveTasks;