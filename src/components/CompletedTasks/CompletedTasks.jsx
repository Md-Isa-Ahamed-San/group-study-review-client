/* eslint-disable react/prop-types */
import { ArrowUpDown, Star, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const CompletedTasks = ({ tasks }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTasks = tasks?.filter((assignment) =>
    assignment.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4 p-4 max-w-4xl mx-auto">
      {/* Heading */}
      <h2 className="text-2xl font-bold text-blue-500 text-center sm:text-left">Completed Tasks</h2>

      {/* Search & Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <input
          type="text"
          placeholder="Search completed tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow p-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white w-full sm:w-auto"
        />
        <div className="flex space-x-2">
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
      </div>

      {/* Scrollable Task List */}
      <div className="max-h-[70vh] overflow-y-auto p-2 bg-gray-800 rounded-lg border border-gray-700">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((assignment) => (
            <Link
              key={assignment._id}
              to={`/dashboard/${assignment.class_id}/${assignment._id}`}
              state={{ assignment }}
            >
              <div className="bg-gradient-to-br from-[#1F2A40] to-[#141B2D] p-4 my-4 rounded-lg shadow-lg border border-gray-600 cursor-pointer hover:border-teal-500 transition duration-300">
                <h3 className="font-semibold text-lg text-white">
                  {assignment.title}
                </h3>
                <p className="text-sm text-gray-400">
                  Last Submit Date:{" "}
                  {new Date(assignment.dueDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-400 text-center py-4">No completed tasks found.</p>
        )}
      </div>
    </div>
  );
};

export default CompletedTasks;
