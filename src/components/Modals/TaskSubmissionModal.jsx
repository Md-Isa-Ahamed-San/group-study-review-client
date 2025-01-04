import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import useTask from "../../hooks/useTask";
import { uploadToCloudinary } from "../../utils";
import useAuth from "../../hooks/useAuth";

import { useQueryClient } from "@tanstack/react-query";
const TaskSubmissionModal = ({ task, onClose }) => {
  const { register, handleSubmit, reset } = useForm();
  const { useSubmitTask } = useTask();
  const { userData } = useAuth();
  const submitTaskMutation = useSubmitTask();
  const queryClient = useQueryClient();
  const handleFormSubmit = async (data) => {
    if (!data.file?.[0]) {
      alert("Please select a file to submit.");
      return;
    }

    try {
      // Upload file to Cloudinary
      const uploadPreset = import.meta.env.VITE_CLOUDINARY_PRESET; // Replace with your actual upload preset
      const cloudName = import.meta.env.VITE_CLOUD_NAME; // Replace with your actual Cloudinary cloud name
      const documentUrl = await uploadToCloudinary(
        data.file[0],
        uploadPreset,
        cloudName
      );

      // Submit the Cloudinary URL to the backend
      submitTaskMutation.mutate(
        {
          task_id: task._id,
          userId: userData._id,
          document: documentUrl, // Send the Cloudinary URL instead of the file itself
        },
        {
          onSuccess: () => {
            
            reset(); // Reset form fields on success
            onClose(); // Close modal on success
            queryClient.invalidateQueries(["classes", task.class_id]);
          },
          onError: (error) => {
            console.error("Submission error:", error);
            alert("Failed to submit the task. Please try again.");
          },
        }
      );
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload the file. Please try again.");
    }
  };

  if (!task) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
        <h2 className="text-lg font-bold">Title: {task.title}</h2>
        <p className="text-sm text-gray-600 mt-2">Due: {task.dueDate}</p>
        <p className="mt-4 text-gray-800">
          Description: {task.description || "No description provided."}
        </p>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload your submission:
          </label>
          <input
            type="file"
            accept=".pdf"
            {...register("file")}
            className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
          <div className="mt-6 flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default TaskSubmissionModal;
