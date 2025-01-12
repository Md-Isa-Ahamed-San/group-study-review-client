import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import useTask from "../../hooks/useTask";
import { uploadToCloudinary } from "../../utils";

import { useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";

const TaskSubmissionModal = ({ task, onClose, isSubmittedByCurrentUser }) => {
  console.log("task inside task submission modal: ", task);
  const submitOrUpdate = isSubmittedByCurrentUser(task);
  console.log("🚀 ~ TaskSubmissionModal ~ submitOrUpdate:", submitOrUpdate);

  const { register, handleSubmit, reset } = useForm();
  const { useSubmitTask, useUpdateSubmitTask } = useTask();
  const { userData } = useAuth();
  // console.log("user Data: ", userData);
  const res = task.submissions.filter((item) => item.userId === userData._id);
  const submissionId = res[0]?._id;
  console.log("🚀 ~ TaskSubmissionModal ~ submissionId:", submissionId);
  console.log("🚀 ~ TaskSubmissionModal ~ userData:", userData);
  const submitTaskMutation = useSubmitTask();
  const updateTaskMutation = useUpdateSubmitTask();
  const queryClient = useQueryClient();

  const handleFormSubmit = async (data) => {
    if (!data.file?.[0] || data.file[0].type !== "application/pdf") {
      alert("Please select a valid PDF file to submit.");
      return;
    }

    try {
      const uploadPreset = import.meta.env.VITE_CLOUDINARY_PRESET;
      const cloudName = import.meta.env.VITE_CLOUD_NAME;

      if (!uploadPreset || !cloudName) {
        alert("Cloudinary configuration is missing.");
        return;
      }

      const documentUrl = await uploadToCloudinary(
        data.file[0],
        uploadPreset,
        cloudName
      );

      const submissionData = {
        task_id: task._id,
        userId: userData._id,
        document: documentUrl,
      };

      // If the user is updating a task, call updateTaskMutation, otherwise call submitTaskMutation
      if (submitOrUpdate) {
        // Call update mutation
        console.log(submissionId, documentUrl);
        updateTaskMutation.mutate(
          {
            submission_id: submissionId,
            document: documentUrl,
            task_id: task._id,
            userId: userData._id,
          },
          {
            onSuccess: () => {
              reset({ file: null }); // Reset the form
              onClose();
              queryClient.invalidateQueries(["classes", task.class_id]);
            },
            onError: (error) => {
              console.error("Update error:", error);
              alert("Failed to update the task. Please try again.");
            },
          }
        );
      } else {
        // Call submit mutation
        submitTaskMutation.mutate(submissionData, {
          onSuccess: () => {
            reset({ file: null }); // Reset the form
            onClose();
            queryClient.invalidateQueries(["classes", task.class_id]);
          },
          onError: (error) => {
            console.error("Submission error:", error);
            alert("Failed to submit the task. Please try again.");
          },
        });
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload the file. Please try again.");
    }
  };

  if (!task) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-gradient-to-br from-[#1F2A40] to-[#141B2D] p-6 rounded-lg shadow-lg max-w-md w-full relative border border-gray-600">
        <h2 className="text-lg font-bold text-blue-400">Title: {task.title}</h2>
        <p className="text-sm text-gray-400 mt-2">
          Due:{" "}
          {new Date(task.dueDate).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className="mt-4 text-gray-300">
          Description: {task.description || "No description provided."}
        </p>
        {task.document && (
          <a
            href={task.document}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block text-blue-400 hover:text-blue-300 underline"
          >
            View Task Document
          </a>
        )}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="mt-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {submitOrUpdate ? (
              <p className="text-yellow-500">Update your document</p>
            ) : (
              <p className="text-green-400">Upload your document</p>
            )}
          </label>
          <input
            type="file"
            accept=".pdf"
            {...register("file")}
            className="block w-full text-sm text-gray-400 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="mt-6 flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-300"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
            >
              {submitOrUpdate ? <p>Update</p> : <p>Submit</p>}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default TaskSubmissionModal;
