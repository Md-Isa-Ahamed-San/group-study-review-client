/* eslint-disable react/prop-types */
import { ArrowUpDown, Plus } from "lucide-react";
import { useState } from "react";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useTask from "../../hooks/useTask";
import TaskSubmissionModal from "../Modals/TaskSubmissionModal";

const ActiveTasks = ({ tasks }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { userData } = useAuth();
  const { setToggleCreateTaskModal, useDeleteTask } = useTask();
  const queryClient = useQueryClient();
  const userId = userData?.user?._id;

  const isSubmittedByCurrentUser = (task) => {
    return task.submissions.some((submission) => submission.userId === userId);
  };

  const deleteTaskMutation = useDeleteTask();

  const handleDelete = (taskId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `<span class="px-4 py-1 mr-2 rounded-md transition-all duration-300 bg-gradient-to-r from-red-600/20 to-red-700/20 border border-blue-500/50 text-blue-400">Yes, delete it!</span>`,
      cancelButtonText: `<span class="px-4 py-1 rounded-md transition-all duration-300 bg-gradient-to-r from-gray-700/20 to-gray-800/20 border border-gray-500 text-gray-300">Cancel</span>`,
      customClass: {
        popup: "bg-gradient-to-b from-[#1F2A40] to-[#141B2D] text-white",
        title: "text-blue-400",
        text: "text-gray-300",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTaskMutation.mutateAsync(taskId).then((res) => {
          if (res.success === true) {
            Swal.fire({
              title: "Deleted!",
              text: "The task has been successfully deleted.",
              icon: "success",
              confirmButtonText: `<span class="px-4 py-1 rounded-md transition-all duration-300 bg-gradient-to-r from-blue-500/20 to-teal-500/20 border border-blue-500/50 text-blue-400">OK</span>`,
              customClass: {
                popup: "bg-gradient-to-b bg-[#141B2D] text-white",
                title: "text-blue-400",
                text: "text-gray-300",
              },
              buttonsStyling: false,
            });
            queryClient.invalidateQueries(["classes"]);
          } else {
            Swal.fire({
              title: "Delete Rejected!",
              text: "The task could not be deleted. Please try again.",
              icon: "error",
              confirmButtonText: `<span class="px-4 py-1 rounded-md transition-all duration-300 bg-gradient-to-r from-red-500/20 to-red-700/20 border border-red-500/50 text-red-400">OK</span>`,
              customClass: {
                popup: "bg-gradient-to-b bg-[#141B2D] text-white",
                title: "text-red-400",
                text: "text-gray-300",
              },
              buttonsStyling: false,
            });
          }
        });
      }
    });
  };

  const filteredTasks = tasks?.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4 text-blue-500">Active Tasks</h2>
      <div className="flex items-center mb-4 space-x-2">
        <input
          type="text"
          placeholder="Search active tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow p-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
        />
        <button
          onClick={() => setToggleCreateTaskModal(true)}
          className="p-2 bg-gray-700 rounded-md hover:bg-gray-600 transition duration-300"
        >
          <Plus className="h-5 w-5 text-blue-500" />
        </button>
        <button className="p-2 bg-gray-700 rounded-md hover:bg-gray-600 transition duration-300">
          <ArrowUpDown className="h-5 w-5 text-blue-500" />
        </button>
      </div>
      {filteredTasks?.length > 0 ? (
        filteredTasks.map((task) => (
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
              <div className="flex gap-4">
                {task?.created_by === userData?.user?._id && (
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="px-4 py-1 rounded-md transition-all duration-300 bg-gradient-to-r from-red-600/20 to-red-700-500/20 border border-blue-500/50 text-blue-400"
                  >
                    Delete
                  </button>
                )}
                <button
                  onClick={() => setSelectedTask(task)}
                  className="px-4 py-1 rounded-md transition-all duration-300 bg-gradient-to-r from-blue-500/20 to-teal-500/20 border border-blue-500/50 text-blue-400"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-400">No active tasks available.</p>
      )}
      {selectedTask && (
        <TaskSubmissionModal
          task={selectedTask}
          isSubmittedByCurrentUser={isSubmittedByCurrentUser}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
};

export default ActiveTasks;
