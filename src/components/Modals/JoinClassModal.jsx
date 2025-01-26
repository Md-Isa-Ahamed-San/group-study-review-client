/* eslint-disable react/prop-types */
import { useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useClass from "../../hooks/useClass";

const JoinClassModal = ({ setToggleJoinClassModal }) => {
  const [classCode, setClassCode] = useState("");
  const { userData } = useAuth();
  const { useJoinClass } = useClass();
  const joinClassMutation = useJoinClass();
  const queryClient = useQueryClient();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (classCode.trim() === "") {
      alert("Please enter a valid class code.");
      return;
    }

    joinClassMutation.mutate(
      { _id: userData.user._id, classCode },
      {
        onSuccess: () => {
          // Refetch the class data
          queryClient.invalidateQueries(["classes"]);
          
          // Success actions
          alert("Successfully joined the class!");
          setToggleJoinClassModal(false);
          console.log("User joined the class successfully.");
        },
        onError: (error) => {
          // Error handling
          console.error("Error joining the class:", error.message);
          alert(error.message || "Failed to join the class.");
        },
      }
    );
  };

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
              <h2 className="text-2xl font-bold text-blue-400">Join a Class</h2>
              <button
                onClick={() => setToggleJoinClassModal(false)}
                className="text-gray-400 hover:text-blue-400 transition duration-300 p-1"
                aria-label="Close modal"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="classCode"
                  className="block text-sm font-medium text-gray-300"
                >
                  Class Code
                </label>
                <input
                  type="text"
                  id="classCode"
                  value={classCode}
                  onChange={(e) => setClassCode(e.target.value)}
                  className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setToggleJoinClassModal(false)}
                  className="px-4 py-2 border border-gray-700 rounded-md text-gray-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Join
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default JoinClassModal;
