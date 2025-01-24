/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Modal from "react-modal";
import { X } from "lucide-react";
import useTask from "../../hooks/useTask";

const FeedbackModal = ({ isOpen, onClose, submissionId }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState("");
  const { useFetchFeedbacks } = useTask();
// console.log("submission id inside feedbackmodal: ",submissionId)
  const {
    data: fetchedFeedbacks,
    error,
    isLoading,
  } = useFetchFeedbacks({submissionId});
  // const { mutate: postFeedback } = usePostFeedbacks();
  console.log("fetchedFeedbacks: ", fetchedFeedbacks);
  useEffect(() => {
    if (isOpen && submissionId) {
      // Fetch feedbacks when modal opens and submissionId is available
      if (fetchedFeedbacks) {
        setFeedbacks(fetchedFeedbacks);
      }
    }
  }, [isOpen, submissionId, fetchedFeedbacks]);

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    if (!newFeedback.trim()) return;

    // Post feedback to API
    // postFeedback({ submissionId, content: newFeedback })
    //   .then(() => {
    //     // Clear the textarea after successful submission
    //     setNewFeedback("");
    //   })
    //   .catch((err) => {
    //     console.error("Error submitting feedback:", err);
    //   });
  };

  if (isLoading) return <div>Loading feedbacks...</div>;
  if (error) return <div>Error loading feedbacks: {error.message}</div>;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Feedback Modal"
      className="fixed inset-0 flex items-center justify-center z-100 absolute"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-[#1F2A40] rounded-lg p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white ml-1">Feedback</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="space-y-4 mb-4 max-h-80 overflow-auto">
          {feedbacks.map((feedback) => (
            <div
              key={feedback._id}
              className="bg-[#141B2D] p-3 rounded-lg text-white"
            >
              <p className="text-sm">{feedback?.content}</p>
              <p className="text-xs text-gray-400 mt-1">
                By {feedback?.user?.username} on{" "}
                {new Date(feedback?.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
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
