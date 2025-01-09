/* eslint-disable react/prop-types */
import { ArrowUpDown, Plus } from "lucide-react";
import { useState } from "react";
import ReactDOM from "react-dom"; // Update the path to your auth context
import useAuth from "../../hooks/useAuth";
import TaskSubmissionModal from "../Modals/TaskSubmissionModal";
import useTask from "../../hooks/useTask";

const ActiveTasks = ({ tasks }) => {
  const [selectedTask, setSelectedTask] = useState(null); // Track selected task
  const { userData } = useAuth(); // Get the current user's data
  const { setToggleCreateTaskModal } = useTask();
  const userId = userData?._id;
  console.log("active tasks: ", tasks);
  const isSubmittedByCurrentUser = (task) => {
    return task.submissions.some((submission) => submission.userId === userId);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4 text-blue-500">Active Tasks</h2>
      <div className="flex items-center mb-4 space-x-2">
        <input
          type="text"
          placeholder="Search active tasks..."
          className="flex-grow p-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
        />
        <button className="p-2 bg-gray-700 rounded-md hover:bg-gray-600 transition duration-300">
          <Plus
            onClick={() => setToggleCreateTaskModal(true)}
            className="h-5 w-5 text-blue-500"
          />
        </button>
        <button className="p-2 bg-gray-700 rounded-md hover:bg-gray-600 transition duration-300">
          <ArrowUpDown className="h-5 w-5 text-blue-500" />
        </button>
      </div>
      {tasks?.length > 0 ? (
        tasks.map((task) => (
          <div
            key={task._id}
            className="bg-gradient-to-br relative from-[#1F2A40] to-[#141B2D] p-4 rounded-lg shadow-lg border border-gray-600"
          >
            <h3 className="font-semibold text-lg text-white">{task.title}</h3>
            <p className="text-sm text-gray-400">
              Due:{" "}
              {new Date(task.dueDate).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
            <div className="mt-4 flex justify-between items-center">
              <span
                className={`text-sm px-2 py-1 rounded ${
                  isSubmittedByCurrentUser(task)
                    ? "bg-green-900 text-green-300"
                    : "bg-yellow-900 text-yellow-300"
                }`}
              >
                {isSubmittedByCurrentUser(task) ? "Submitted" : "Not Submitted"}
              </span>
              <button
                onClick={() => setSelectedTask(task)} // Set the selected task
                className="px-4 py-1 rounded-md transition-all duration-300 bg-gradient-to-r from-blue-500/20 to-teal-500/20 border border-blue-500/50 text-blue-400"
              >
                Details
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-400">No active tasks available.</p>
      )}

      {/* Modal for task details and submission */}
      {selectedTask && (
        <TaskSubmissionModal
          task={selectedTask}
          isSubmittedByCurrentUser={isSubmittedByCurrentUser}
          onClose={() => setSelectedTask(null)} // Close the modal
          // onSubmit={handleSubmitTask} // Pass the submit handler
        />
      )}
    </div>
  );
};

export default ActiveTasks;
