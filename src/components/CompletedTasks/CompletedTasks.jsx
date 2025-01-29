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
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4 text-blue-500">Completed Tasks</h2>
      <div className="flex items-center mb-4 space-x-2">
        <input
          type="text"
          placeholder="Search completed tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow p-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
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
      {filteredTasks?.map((assignment) => (
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
              Last Submit Date :{" "}
              {new Date(assignment.dueDate).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CompletedTasks;
