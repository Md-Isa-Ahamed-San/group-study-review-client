import { useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Upload, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useTask from "../../hooks/useTask";
import { uploadToCloudinary } from "../../utils";
import useAxios from "../../hooks/useAxios";
import { toast, Toaster } from "react-hot-toast";

export default function TaskModal({ class_id, uniqueKey }) {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const { userData } = useAuth();
  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_PRESET;
  const { setToggleCreateTaskModal, useCreateTask } = useTask();
  const [file, setFile] = useState(null);
  const { api } = useAxios();
  const queryClient = useQueryClient();
  const createTaskMutation = useCreateTask();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        toast.error("Only PDF files are allowed.");
        return;
      }
      if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error("File size exceeds 10MB.");
        return;
      }
      setFile(selectedFile);
      setValue("file", selectedFile);
    }
  };

  const onSubmit = async (data) => {
    try {
      if (file) {
        const uploadedFileUrl = await uploadToCloudinary(file, uploadPreset, cloudName);
        data.document = uploadedFileUrl;
      }
      data.class_id = class_id;
      data.created_by = userData.user._id;

      const response = await createTaskMutation.mutateAsync(data);
      if (response.status === 201) {
        toast.success("Task created successfully!");
        queryClient.invalidateQueries(["tasks", class_id]);
        setToggleCreateTaskModal(false);
      } else {
        throw new Error("Unexpected response status: " + response.status);
      }
    } catch (error) {
      toast.error("Failed to submit the task. Please try again.");
      console.error("Error during task creation:", error);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        key={uniqueKey}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
      
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gray-900 rounded-lg w-full max-w-md border border-blue-700 shadow-lg shadow-blue-500/20"
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-blue-400">Create Task</h2>
              <button
                onClick={() => setToggleCreateTaskModal(false)}
                className="text-gray-400 hover:text-blue-400 transition duration-300 p-1"
                aria-label="Close modal"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-300">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  {...register("title", { required: "Title is required" })}
                  className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
                {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-300">
                  Description
                </label>
                <textarea
                  id="description"
                  {...register("description", { required: "Description is required" })}
                  rows={3}
                  className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
                {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
              </div>

              {/* Due Date */}
              <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-300">
                  Due Date
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="dueDate"
                    {...register("dueDate", { required: "Due date is required" })}
                    className="block w-full pl-10 rounded-md bg-gray-800 border-gray-700 text-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  />
                </div>
                {errors.dueDate && <p className="text-sm text-red-500">{errors.dueDate.message}</p>}
              </div>

              {/* File Upload */}
              <div>
                <label htmlFor="file" className="block text-sm font-medium text-gray-300">
                  Upload PDF
                </label>
                {file ? (
                  <div className="mt-1 flex flex-col items-center border border-gray-700 rounded-md p-4 bg-gray-800 text-gray-300">
                    <p className="text-sm">File Uploaded: <span className="text-blue-400">{file.name}</span></p>
                    <button
                      type="button"
                      onClick={() => {
                        setFile(null);
                        setValue("file", null);
                      }}
                      className="mt-2 px-3 py-1 border border-gray-600 rounded-md text-red-400 hover:bg-gray-700"
                    >
                      Remove File
                    </button>
                  </div>
                ) : (
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-700 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-400">
                        <label
                          htmlFor="file"
                          className="relative cursor-pointer rounded-md font-medium text-blue-500 hover:text-blue-400 focus:outline-none"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file"
                            type="file"
                            className="sr-only"
                            onChange={handleFileChange}
                            accept=".pdf"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PDF up to 10MB</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setToggleCreateTaskModal(false)}
                  className="px-4 py-2 border border-gray-700 rounded-md text-gray-300 hover:bg-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Create Assignment
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
