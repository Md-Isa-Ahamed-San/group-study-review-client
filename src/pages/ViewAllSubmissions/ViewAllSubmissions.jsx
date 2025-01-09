import {
  ArrowUpDown,
  CircleUserRound,
  FileText,
  Star,
  ThumbsUp,
  X,
} from "lucide-react";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useLocation } from "react-router-dom";
import useTask from "../../hooks/useTask";
import SubmissionCard from "../../components/SubmissionCard/SubmissionCard";

// Initialize pdfjs worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function ViewAllSubmissions() {
  const location = useLocation();
  const { assignment } = location.state || {};
  const { useGetAllSubmissions } = useTask();
  const {
    isError,
    isLoading,
    data: submissionResponse,
  } = useGetAllSubmissions(assignment?._id);
  console.log(" submissionResponse: ", submissionResponse);
  const [expandedSubmission, setExpandedSubmission] = useState(null);
  const [sortCriteria, setSortCriteria] = useState("submitted_at");
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPdf, setSelectedPdf] = useState(null);

  const toggleExpand = (id) => {
    setExpandedSubmission(expandedSubmission === id ? null : id);
  };

  const handleUpvote = (id, type) => {
    // Directly manipulate submissionResponse data to reflect upvotes
    const updatedSubmissions = submissionResponse?.data?.map((submission) => {
      if (submission._id === id) {
        if (type === "student") {
          return {
            ...submission,
            user_upvotes: submission.user_upvotes.includes(id)
              ? submission.user_upvotes.filter((userId) => userId !== id)
              : [...submission.user_upvotes, id],
          };
        } else {
          return {
            ...submission,
            expert_upvotes: submission.expert_upvotes.includes(id)
              ? submission.expert_upvotes.filter((userId) => userId !== id)
              : [...submission.expert_upvotes, id],
          };
        }
      }
      return submission;
    });
  };

  const openPdf = (url) => {
    setSelectedPdf(url);
  };

  const closePdf = () => {
    setSelectedPdf(null);
  };

  const sortedAndFilteredSubmissions = submissionResponse?.submissions
    ?.filter((submission) =>
      submission.user.username.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortCriteria === "submitted_at") {
        return sortOrder === "asc"
          ? new Date(a.submitted_at).getTime() -
              new Date(b.submitted_at).getTime()
          : new Date(b.submitted_at).getTime() -
              new Date(a.submitted_at).getTime();
      } else if (sortCriteria === "studentUpvotes") {
        return sortOrder === "asc"
          ? a.user_upvotes.length - b.user_upvotes.length
          : b.user_upvotes.length - a.user_upvotes.length;
      } else if (sortCriteria === "expertUpvotes") {
        return sortOrder === "asc"
          ? a.expert_upvotes.length - b.expert_upvotes.length
          : b.expert_upvotes.length - a.expert_upvotes.length;
      }
      return 0;
    });

  const taskDetails = submissionResponse?.task || {};
  const classDetails = submissionResponse?.classInfo || {};
  console.log("len: ", submissionResponse?.submissions?.length);

  return (
    <div className="min-h-screen bg-[#0B1120] text-gray-100 p-6">
      <div className="bg-gradient-to-br from-[#1F2A40] to-[#141B2D] border border-[#1F2A40] rounded-lg shadow-lg p-6">
        <div className="mb-6 p-6 bg-gradient-to-r from-[#2C3E50] to-[#1F2A40] rounded-lg shadow-lg">
          <h1 className="text-3xl font-extrabold text-[#00FFD1] mb-3 transition-colors hover:text-[#00FF99]">
            {classDetails?.title || "Untitled Task"}
          </h1>
          <p className="text-gray-300 text-lg mb-2">
            {classDetails?.description || "No task description available"}
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
          <div className="w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search submissions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-[#141B2D] border border-[#1F2A40] rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00FFD1]"
            />
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={sortCriteria}
              onChange={(e) => setSortCriteria(e.target.value)}
              className="px-4 py-2 bg-[#141B2D] border border-[#1F2A40] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#00FFD1]"
            >
              <option value="submitted_at">Submission Date</option>
              <option value="studentUpvotes">Student Upvotes</option>
              <option value="expertUpvotes">Expert Upvotes</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="p-2 bg-[#141B2D] border border-[#1F2A40] rounded-md text-white hover:bg-[#1F2A40] focus:outline-none focus:ring-2 focus:ring-[#00FFD1]"
            >
              <ArrowUpDown className="h-4 w-4" />
            </button>
          </div>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <p className="text-3xl">Loading submissions...</p>
          </div>
        ) : isError ? (
          <p>Error loading submissions.</p>
        ) : (
          <div className="space-y-4">
            {submissionResponse?.submissions?.length === 0 ? (
              <div className="flex justify-center items-center">
                <p className="text-3xl">No submissions for this task</p>
              </div>
            ) : (
              sortedAndFilteredSubmissions?.map((submission) => (
                <SubmissionCard key={submission._id} submission={submission} />
              ))
            )}
          </div>
        )}
      </div>

      {selectedPdf && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg w-full max-w-3xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Submission PDF
              </h2>
              <button
                onClick={closePdf}
                className="text-gray-600 hover:text-gray-800"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="border border-gray-200 rounded-md p-2 overflow-hidden">
              <Document file={selectedPdf} className="overflow-x-auto">
                <Page pageNumber={1} />
              </Document>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
