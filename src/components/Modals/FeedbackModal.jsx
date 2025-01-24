/* eslint-disable react/prop-types */
import Modal from "react-modal";
import { X } from "lucide-react";
import { ClipLoader } from "react-spinners"; // Spinner for loading state
import useTask from "../../hooks/useTask";
import useAuth from "../../hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query"; // For query invalidation
import { useState } from "react";

Modal.setAppElement("#root"); // Ensures accessibility by tying modal to the root element

const FeedbackModal = ({ isOpen, onClose, submissionId }) => {
  const [newFeedback, setNewFeedback] = useState("");
  const { useFetchFeedbacks, usePostFeedback } = useTask();
  const { userData } = useAuth();
  const queryClient = useQueryClient();

  // Fetch feedbacks using the custom hook
  const {
    data: fetchedFeedbacks,
    error,
    isLoading,
  } = useFetchFeedbacks({
    submissionId,
  });
  // console.log("🚀 ~ FeedbackModal ~ fetchedFeedbacks:", fetchedFeedbacks);

  const postFeedback = usePostFeedback(); // Mutation hook for posting feedback

  // Handle feedback submission
  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    if (!newFeedback.trim()) return;

    try {
      await postFeedback.mutateAsync({
        submissionId,
        content: newFeedback,
        user_id: userData._id,
      });

      // Invalidate the feedbacks query to fetch updated data
      queryClient.invalidateQueries(["feedbacks", submissionId]);

      setNewFeedback(""); // Clear the input
    } catch (err) {
      console.error("Error submitting feedback:", err);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Feedback Modal"
      className="inset-0 flex items-center justify-center z-100 absolute"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-[#1F2A40] rounded-lg p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white ml-1">Feedback</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <ClipLoader color="#00FFD1" size={50} />
          </div>
        ) : error ? (
          <div className="text-red-400 text-center">
            Error loading feedbacks: {error.message}
          </div>
        ) : (
          <div className="space-y-4 mb-4 max-h-80 overflow-auto">
            {/* Render Feedbacks */}
            {fetchedFeedbacks?.length > 0 ? (
              fetchedFeedbacks.map((feedback) => (
                <div
                  key={feedback._id}
                  className="bg-[#141B2D] p-3 rounded-lg text-white"
                >
                  <p className="text-sm">{feedback?.content}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    By {feedback?.userInfo?.username} on{" "}
                    {new Date(feedback?.created_at).toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-gray-400 text-center text-xl md:py-4">
                No feedbacks available.
              </div>
            )}
          </div>
        )}

        {/* Feedback Form */}
        <form onSubmit={handleSubmitFeedback} className="mt-4">
          <textarea
            value={newFeedback}
            onChange={(e) => setNewFeedback(e.target.value)}
            placeholder="Write your feedback here..."
            className="w-full p-2 rounded-lg bg-[#141B2D] text-white border border-gray-600 focus:border-[#00FFD1] focus:ring focus:ring-[#00FFD1] focus:ring-opacity-50"
            rows={2}
          />
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-[#00FFD1] text-[#141B2D] rounded-lg hover:bg-[#00FFD1]/80 transition-colors"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default FeedbackModal;
