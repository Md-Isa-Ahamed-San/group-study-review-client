/* eslint-disable react/prop-types */
import { ArrowUpDown, ThumbsUp, Star } from "lucide-react";

const CompletedTasks = ({ tasks }) => {
  // console.log(tasks)
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4 text-teal-400">Completed Tasks</h2>
      <div className="flex items-center mb-4 space-x-2">
        <input
          type="text"
          placeholder="Search completed tasks..."
          className="flex-grow p-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          // Add logic for search functionality if required
        />
        <button className="p-2 bg-gray-700 rounded-md hover:bg-gray-600 transition duration-300">
          <ArrowUpDown className="h-5 w-5 text-teal-400" />
        </button>
        <button className="p-2 bg-gray-700 rounded-md hover:bg-gray-600 transition duration-300">
          <ThumbsUp className="h-5 w-5 text-teal-400" />
        </button>
        <button className="p-2 bg-gray-700 rounded-md hover:bg-gray-600 transition duration-300">
          <Star className="h-5 w-5 text-yellow-400" />
        </button>
      </div>
      {tasks?.map((assignment) => (
        <div
          key={assignment._id}
          className="bg-gradient-to-br from-[#1F2A40] to-[#141B2D] p-4 rounded-lg shadow-lg border border-gray-600 cursor-pointer hover:border-teal-500 transition duration-300"
        >
          <h3 className="font-semibold text-lg text-white">
            {assignment.title}
          </h3>
          <p className="text-sm text-gray-400">
            Last Submit Date : {assignment.dueDate}
          </p>
          <div className="mt-2 flex items-center space-x-4">
            {/* <span className="text-sm text-gray-400 flex items-center">
              <ThumbsUp className="h-4 w-4 mr-1 text-teal-400" />{" "}
              {assignment.studentUpvotes}
            </span>
            <span className="text-sm text-gray-400 flex items-center">
              <Star className="h-4 w-4 mr-1 text-yellow-400" />{" "}
              {assignment.expertUpvotes}
            </span> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompletedTasks;
