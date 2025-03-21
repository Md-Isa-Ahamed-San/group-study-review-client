import { useState } from "react";
import useClass from "../../hooks/useClass";
import {
  FaUser,
  FaChalkboardTeacher,
  FaTasks,
  FaThumbsUp,
  FaComment,
  FaSearch,
  FaArrowLeft,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { useFetchUserProfile } = useClass();
  const { data: profile, isLoading: profileLoading } = useFetchUserProfile();
  const [search, setSearch] = useState("");

  if (profileLoading)
    return (
      <p className="text-center text-gray-400 mt-10">Loading profile...</p>
    );

  const filteredSubmissions =
    search.length > 0
      ? profile.data?.submissions?.filter((submission) =>
          submission.task_id?.title.toLowerCase().includes(search.toLowerCase())
        )
      : profile?.data?.submissions;

  return (
    <div className=" mx-auto p-6 bg-gray-900 text-white shadow-lg px-4 md:px-20 lg:px-64  py-4 md:py-6 lg:py-10">
      {/* Go Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 mb-4"
      >
        <FaArrowLeft /> Go Back
      </button>

      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start space-x-0 md:space-x-4 border-b border-gray-700 pb-4">
        {profile.data?.user?.profile_picture ? (
          <img
            src={profile.data.user.profile_picture}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover shadow-md"
          />
        ) : (
          <FaUser className="w-24 h-24 text-gray-500" />
        )}
        <div className="text-center md:text-left mt-4 md:mt-0">
          <h1 className="text-3xl font-bold">
            {profile.data?.user?.username || "Unknown User"}
          </h1>
          <p className="text-gray-400">{profile.data?.user?.email}</p>
          <p className="text-gray-500">
            Joined on{" "}
            {new Date(profile.data?.user?.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Engagement Stats */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg flex items-center gap-2 shadow-sm">
          <FaThumbsUp className="text-blue-400 text-2xl" />
          <span className="font-semibold text-lg">
            {profile.data?.engagement?.totalUpvotes || 0} Upvotes
          </span>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg flex items-center gap-2 shadow-sm">
          <FaComment className="text-green-400 text-2xl" />
          <span className="font-semibold text-lg">
            {profile.data?.engagement?.totalFeedbacks || 0} Feedbacks
          </span>
        </div>
      </div>

      {/* Responsive Grid Layout */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Joined Classes */}
        <div>
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <FaChalkboardTeacher /> Joined Classes
          </h2>
          {profile.data?.classes?.length > 0 ? (
            <ul className="mt-3 space-y-4">
              {profile.data.classes.map((cls) => (
                <li
                  key={cls._id}
                  className="bg-gray-800 p-4 rounded-lg shadow-md"
                >
                  <p className="text-lg font-medium">{cls.class_name}</p>
                  <p className="text-sm text-gray-400">
                    Class Code: {cls.class_code}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {cls.description}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 mt-2">No classes joined yet.</p>
          )}
        </div>

        {/* Submissions */}
        <div>
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <FaTasks /> Submissions
          </h2>
          <div className="flex items-center bg-gray-800 rounded-lg p-2 mt-3">
            <FaSearch className="text-gray-400 ml-2" />
            <input
              type="text"
              placeholder="Search submissions..."
              className="bg-transparent text-white px-3 py-1 w-full focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {filteredSubmissions?.length > 0 ? (
            <ul className="mt-3 space-y-3">
              {filteredSubmissions.map((submission) => (
                <li
                  key={submission._id}
                  className="bg-gray-800 p-4 rounded-lg shadow-md"
                >
                  <p className="text-lg font-medium">
                    Task: {submission.task_id?.title || "Untitled Task"}
                  </p>
                  <p className="text-sm text-gray-400">
                    {submission.task_id?.description || "No description"}
                  </p>
                  <a
                    href={submission.document}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline font-medium"
                  >
                    View Submission
                  </a>
                  <p className="text-xs text-gray-500">
                    Submitted on{" "}
                    {new Date(submission.submitted_at).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 mt-2">No submissions found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
