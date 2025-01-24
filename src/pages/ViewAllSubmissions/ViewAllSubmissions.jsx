import {
  ArrowUpDown,
  CircleUserRound,
  FileText,
  Star,
  ThumbsUp,
  X,
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useLocation, useParams } from "react-router-dom";
import useTask from "../../hooks/useTask";
import SubmissionCard from "../../components/SubmissionCard/SubmissionCard";
import useAuth from "../../hooks/useAuth";
import FeedbackModal from "../../components/Modals/FeedbackModal";

// Initialize pdfjs worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function ViewAllSubmissions() {
  const location = useLocation();
  const { assignment } = location.state || {};
  const {
    useGetAllSubmissions,
    useFetchClassesById,
    useUpvoteToggle,
    selectedSubmissionId,
    setSelectedSubmissionId,
  } = useTask();

  const queryClient = useQueryClient();
  const { classId, taskId } = useParams();
  const { userData } = useAuth();

  const { data: classData, isLoading: classDataLoading } =
    useFetchClassesById(classId);
  const {
    isLoading: submissionResponseLoading,
    isError,
    data: submissionResponse,
  } = useGetAllSubmissions(assignment?._id);
  const { upvoteToggleMutation } = useUpvoteToggle();
  // console.log("submissionResponse: ",submissionResponse)
  // console.log("userData: ", userData);
  // console.log("classData: ", classData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const verifyUserType = () => {
    if (
      classData?.data?.experts?.some((expert) => expert._id === userData._id)
    ) {
      return "experts";
    }
    if (
      classData?.data?.members?.some((member) => member._id === userData._id)
    ) {
      return "members";
    }
    return null;
  };

  const userType = verifyUserType();

  const handleUpvote = (submissionId) => {
    if (!userType) {
      console.error("User type could not be determined. Upvote not allowed.");
      return;
    }

    console.log(
      `Upvote: ${submissionId}, Type: ${userType}, UserId: ${userData._id}`
    );

    // Call mutation with the required data
    upvoteToggleMutation.mutate(
      {
        submissionId,
        userType,
        userId: userData._id,
      },
      {
        onSuccess: () => {
          console.log("Upvote toggled successfully.");
          queryClient.invalidateQueries(["submissions", taskId]);
        },
      },
      {
        onError: (error) => {
          console.error("Failed to toggle upvote:", error);
          alert("Failed to toggle upvote");
        },
      }
    );
  };

  const sortedAndFilteredSubmissions = submissionResponse?.submissions?.sort(
    (a, b) => {
      return new Date(b.submitted_at) - new Date(a.submitted_at);
    }
  );

  return (
    <div className="min-h-screen bg-[#0B1120] text-gray-100 p-6 relative">
      <div className="bg-gradient-to-br from-[#1F2A40] to-[#141B2D] border border-[#1F2A40] rounded-lg p-6">
        <h1 className="text-3xl font-extrabold text-[#00FFD1] mb-3">
          {assignment?.title || "Submissions"}
        </h1>
        {submissionResponseLoading || classDataLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error loading submissions.</p>
        ) : (
          <div className="space-y-4">
            {sortedAndFilteredSubmissions?.map((submission) => (
              <SubmissionCard
                key={submission._id}
                submission={submission}
                handleUpvote={handleUpvote}
                userType={userType}
                setIsModalOpen={setIsModalOpen}
                openModal={openModal}
                closeModal={closeModal}
                
              />
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <FeedbackModal
          isOpen={isModalOpen}
          onClose={closeModal}
          submissionId={selectedSubmissionId || null}
        
        />
      )}
      
    </div>
  );
}
