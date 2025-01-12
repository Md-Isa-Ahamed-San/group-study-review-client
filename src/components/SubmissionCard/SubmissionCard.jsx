/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  CircleUserRound,
  FileText,
  ThumbsUp,
  Star,
  ArrowUpDown,
} from "lucide-react";
import { useLocation, useParams } from "react-router-dom";
import useTask from "../../hooks/useTask";
import useAuth from "../../hooks/useAuth";

const SubmissionCard = ({ submission, handleUpvote, userType }) => {
  return (
    <div className="bg-gradient-to-br from-[#1F2A40] to-[#141B2D] border border-[#1F2A40] rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-4">
          {submission?.user?.profile_picture ? (
            <img
              src={submission.user.profile_picture}
              alt={submission.user.username || "User"}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <CircleUserRound className="w-10 h-10 text-gray-400" />
          )}
          <div>
            <h3 className="text-sm font-medium text-white">
              {submission?.user?.username || "Anonymous User"}
            </h3>
            <p className="text-xs text-gray-400 my-1">
              Submitted on {new Date(submission?.submitted_at).toLocaleString()}
            </p>
            <a
              href={submission.document}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm text-[#00FFD1] hover:text-[#00FFD1]/80"
            >
              <FileText className="h-6 w-6 mr-1" /> Open PDF
            </a>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {userType === "members" && (
            <>
              <button
                onClick={() => handleUpvote(submission._id)}
                className={`flex items-center text-sm ${
                  submission.user_upvotes.includes(submission._id)
                    ? "text-[#00FFD1]"
                    : "text-gray-400"
                } hover:text-[#00FFD1]/80`}
              >
                <ThumbsUp className="h-4 w-4 mr-1" />{" "}
                {submission.user_upvotes.length}
              </button>
              <button
                className={`flex items-center text-sm ${
                  submission.expert_upvotes.includes(submission._id)
                    ? "text-yellow-400"
                    : "text-gray-400"
                } `}
              >
                <Star className="h-4 w-4 mr-1" />{" "}
                {submission.expert_upvotes.length}
              </button>
            </>
          )}
          {userType === "experts" && (
            <>
              <button
                className={`flex items-center text-sm ${
                  submission.user_upvotes.includes(submission._id)
                    ? "text-[#00FFD1]"
                    : "text-gray-400"
                } `}
              >
                <ThumbsUp className="h-4 w-4 mr-1" />{" "}
                {submission.user_upvotes.length}
              </button>
              <button
                onClick={() => handleUpvote(submission._id)}
                className={`flex items-center text-sm ${
                  submission.expert_upvotes.includes(submission._id)
                    ? "text-yellow-400"
                    : "text-gray-400"
                } hover:text-yellow-300`}
              >
                <Star className="h-4 w-4 mr-1" />{" "}
                {submission.expert_upvotes.length}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmissionCard;
