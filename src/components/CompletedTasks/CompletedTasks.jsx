import React from "react";
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
const CompletedTasks = () => {
    const completedAssignments = [
        {
          id: 5,
          title: "Data Structures Final",
          completedDate: "2024-03-01",
          expertUpvotes: 2,
          studentUpvotes: 13,
        },
        {
          id: 6,
          title: "Web Development Framework",
          completedDate: "2024-02-28",
          expertUpvotes: 1,
          studentUpvotes: 7,
        },
        {
          id: 7,
          title: "Artificial Intelligence",
          completedDate: "2024-03-05",
          expertUpvotes: 3,
          studentUpvotes: 10,
        },
        {
          id: 8,
          title: "Computer Networks",
          completedDate: "2024-02-25",
          expertUpvotes: 2,
          studentUpvotes: 8,
        },
      ];
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4 text-teal-400">Completed Tasks</h2>
      <div className="flex items-center mb-4 space-x-2">
        <input
          type="text"
          placeholder="Search completed tasks..."
          className="flex-grow p-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
        //   value={completedSearch}
        //   onChange={(e) => setCompletedSearch(e.target.value)}
        />
        <button
        //   onClick={() => changeCompletedSort("completedDate")}
          className="p-2 bg-gray-700 rounded-md hover:bg-gray-600 transition duration-300"
        //   title={`Sort by completion date (${
        //     completedSort.field === "completedDate"
        //       ? completedSort.order === "asc"
        //         ? "Ascending"
        //         : "Descending"
        //       : "Click to sort"
        //   })`}
        >
          <ArrowUpDown className="h-5 w-5 text-teal-400" />
        </button>
        <button
        //   onClick={() => changeCompletedSort("studentUpvotes")}
          className="p-2 bg-gray-700 rounded-md hover:bg-gray-600 transition duration-300"
        //   title={`Sort by student upvotes (${
        //     completedSort.field === "studentUpvotes"
        //       ? completedSort.order === "asc"
        //         ? "Ascending"
        //         : "Descending"
        //       : "Click to sort"
        //   })`}
        >
          <ThumbsUp className="h-5 w-5 text-teal-400" />
        </button>
        <button
        //   onClick={() => changeCompletedSort("expertUpvotes")}
          className="p-2 bg-gray-700 rounded-md hover:bg-gray-600 transition duration-300"
        //   title={`Sort by expert upvotes (${
        //     completedSort.field === "expertUpvotes"
        //       ? completedSort.order === "asc"
        //         ? "Ascending"
        //         : "Descending"
        //       : "Click to sort"
        //   })`}
        >
          <Star className="h-5 w-5 text-yellow-400" />
        </button>
      </div>
      {completedAssignments.map((assignment) => (
        <div
          key={assignment.id}
          className="bg-gradient-to-br from-[#1F2A40] to-[#141B2D]  p-4 rounded-lg shadow-lg border border-gray-600 cursor-pointer hover:border-teal-500 transition duration-300"
        //   onClick={() => openAssignmentDetails(assignment)}
        >
          <h3 className="font-semibold text-lg text-white">
            {assignment.title}
          </h3>
          <p className="text-sm text-gray-400">
            Completed: {assignment.completedDate}
          </p>
          <div className="mt-2 flex items-center space-x-4">
            <span className="text-sm text-gray-400 flex items-center">
              <ThumbsUp className="h-4 w-4 mr-1 text-teal-400" />{" "}
              {assignment.studentUpvotes}
            </span>
            <span className="text-sm text-gray-400 flex items-center">
              <Star className="h-4 w-4 mr-1 text-yellow-400" />{" "}
              {assignment.expertUpvotes}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompletedTasks;
