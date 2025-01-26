/* eslint-disable react/prop-types */
import { ArrowUpDown, ThumbsUp, Star } from "lucide-react";
import { Link } from "react-router-dom";

const CompletedTasks = ({ tasks }) => {
  // console.log("cmp:", tasks);
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4 text-blue-500">Completed Tasks</h2>
      <div className="flex items-center mb-4 space-x-2">
        <input
          type="text"
          placeholder="Search completed tasks..."
          className="flex-grow p-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
          // Add logic for search functionality if required
        />
        <button className="p-2 bg-gray-700 rounded-md hover:bg-gray-600 transition duration-300">
          <ArrowUpDown className="h-5 w-5 text-blue-500" />
        </button>
        <button className="p-2 bg-gray-700 rounded-md hover:bg-gray-600 transition duration-300">
          <ThumbsUp className="h-5 w-5 text-blue-500" />
        </button>
        <button className="p-2 bg-gray-700 rounded-md hover:bg-gray-600 transition duration-300">
          <Star className="h-5 w-5 text-yellow-400" />
        </button>
      </div>
      {tasks?.map((assignment,idx) => (
        <Link
          key={assignment._id}
          // key={idx}
          to={`/dashboard/${assignment.class_id}/${assignment._id}`}
          state={{ assignment }}
        >
          <div className="bg-gradient-to-br from-[#1F2A40] to-[#141B2D] p-4 my-4 rounded-lg shadow-lg border border-gray-600 cursor-pointer hover:border-teal-500 transition duration-300">
            <h3 className="font-semibold text-lg text-white">
              {assignment.title}
            </h3>
            <p className="text-sm text-gray-400">
              Last Submit Date :{" "}
              {new Date(assignment.dueDate).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
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
        </Link>
      ))}
    </div>
  );
};

export default CompletedTasks;
