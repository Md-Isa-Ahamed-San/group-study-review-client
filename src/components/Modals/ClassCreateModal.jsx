import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import React from "react";

const ClassCreateModal = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
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
              <h2 className="text-2xl font-bold text-blue-400">
                Create a class
              </h2>
              <button
                //   onClick={onClose}
                className="text-gray-400 hover:text-blue-400 transition duration-300 p-1"
                aria-label="Close modal"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-300"
                >
                  Class Name
                </label>
                <input
                  type="text"
                  id="title"
                  //   value={title}
                  //   onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-300"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="title"
                  //   value={title}
                  //   onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  required
                />
              </div>


              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  // onClick={onClose}
                  className="px-4 py-2 border border-gray-700 rounded-md text-gray-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ClassCreateModal;
