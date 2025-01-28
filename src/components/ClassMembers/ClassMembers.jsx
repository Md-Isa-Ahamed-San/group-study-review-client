/* eslint-disable react/prop-types */
import { useQueryClient } from "@tanstack/react-query";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Search,
  User,
  UserRoundCog
} from "lucide-react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useClass from "../../hooks/useClass";
import useTask from "../../hooks/useTask";

const ClassMembers = ({
  members,
  experts,
  admins,
  classCode,
  onPromoteUser,
}) => {
  console.log("meac : ", members, experts, admins, classCode);
  const { userData } = useAuth();
  
  const { useChangeRole } = useClass();
  const changeRoleMutation = useChangeRole();
  const queryClient = useQueryClient();
  // Handle copy class code to clipboard
  const { classId } = useParams(); // Get the class ID from the route params
  const { useFetchClassesById } = useTask();
  // console.log("id of class inside class :",id)
  // Fetch class data using the ID
  const {
    data: classData,
    isLoading,
    isError,
    error,
  } = useFetchClassesById(classId);
  const handleCopyClassCode = () => {
    navigator.clipboard.writeText(classCode);
    alert("Class code copied to clipboard!");
  };

  const adminsList = admins?.map((admin) => admin.email);

  const handlePromote = (userId,creator) => {
    // Determine if the user is an expert or member
    const isExpert = experts.some((expert) => expert._id === userId);

    // Configure modal message
    const action = isExpert ? "demote" : "promote";
    const modalTitle = isExpert
      ? "Demote the user?"
      : "Promote the user to Expert?";
    const modalText = isExpert
      ? "This will remove the user from the Experts list."
      : "This will add the user to the Experts list.";

    // Show confirmation modal
    Swal.fire({
      title: modalTitle,
      text: modalText,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `<span class="px-4 py-1 mr-2 rounded-md transition-all duration-300 bg-gradient-to-r ${
        isExpert
          ? "from-red-600/20 to-red-700/20 border border-red-500/50 text-red-400"
          : "from-blue-600/20 to-blue-700/20 border border-blue-500/50 text-blue-400"
      }">${isExpert ? "Yes, demote!" : "Yes, promote!"}</span>`,

      cancelButtonText: `<span class="px-4 py-1 rounded-md transition-all duration-300 bg-gradient-to-r from-gray-700/20 to-gray-800/20 border border-gray-500 text-gray-300">Cancel</span>`,
      customClass: {
        popup: "bg-gradient-to-b bg-[#141B2D] text-white",
        title: "text-blue-400",
        text: "text-gray-300",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        // Execute promote/demote action
        changeRoleMutation
          .mutateAsync({ userId, classCode,creator})
          .then((res) => {
            console.log("res99999: ",res)
            if (res.status===200) {
              Swal.fire({
                title: isExpert ? "Demoted!" : "Promoted!",
                text: `The user has been successfully ${
                  isExpert ? "demoted" : "promoted"
                }.`,
                icon: "success",
                confirmButtonText: `<span class="px-4 py-1 mr-2 rounded-md transition-all duration-300 bg-gradient-to-r from-blue-500/20 to-teal-500/20 border border-blue-500/50 text-blue-400">OK</span>`,
                customClass: {
                  popup:
                    "bg-gradient-to-b bg-[#141B2D] text-white",
                  title: "text-blue-400",
                  text: "text-gray-300",
                },
                buttonsStyling: false,
              });
              queryClient.invalidateQueries(["classes"]);
            } else {
              Swal.fire({
                title: "Action Rejected!",
                text: "The action could not be completed. Please try again.",
                icon: "error",
                confirmButtonText: `<span class="px-4 py-1 rounded-md transition-all duration-300 bg-gradient-to-r from-red-500/20 to-red-700/20 border border-red-500/50 text-red-400">OK</span>`,
                customClass: {
                  popup:
                    "bg-gradient-to-b bg-[#141B2D] text-white",
                  title: "text-red-400",
                  text: "text-gray-300",
                },
                buttonsStyling: false,
              });
            }
          });
      }
    });
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-blue-500 text-center lg:text-left">
        Class Members
      </h2>
      <div className="bg-gradient-to-br from-[#1F2A40] to-[#141B2D] p-6 rounded-lg shadow-lg border border-gray-700">
        {/* Search Section */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search members..."
            className="flex-grow p-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white shadow-md"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-md transition duration-300">
            <Search className="h-5 w-5" />
          </button>
        </div>

        {/* Experts Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-yellow-400 mb-3 text-center lg:text-left">
            Experts
          </h3>
          <div className="space-y-4 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
            {experts?.map((member) => (
              <div
                key={member._id}
                className="flex items-center space-x-4 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg shadow-md transition duration-300"
              >
                {member?.profile_picture ? (
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-12 h-12 rounded-full border-2 border-yellow-400"
                  />
                ) : (
                  <UserRoundCog className="text-yellow-400 w-10 h-10" />
                )}
                <div>
                  <p className="font-semibold text-yellow-400">
                    {member.username}
                  </p>
                  {adminsList.includes(member.email) && (
                    <p className="text-sm text-gray-400">Admin</p>
                  )}
                </div>
                <button
                  onClick={() => handlePromote(member?._id,classData?.data?.created_by)}
                  className="ml-auto text-blue-500 hover:text-blue-400"
                >
                  <ArrowDownCircle className="w-6 h-6" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Members Section */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3 text-center lg:text-left">
            Members
          </h3>
          <div className="space-y-4 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
            {members?.map((member) => (
              <div
                key={member._id}
                className="flex items-center space-x-4 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg shadow-md transition duration-300"
              >
                {member?.profile_picture ? (
                  <img
                    src={member.profile_picture}
                    alt={member.username}
                    className="w-12 h-12 rounded-full border-2 border-gray-600"
                  />
                ) : (
                  <User className="w-10 h-10 text-gray-400" />
                )}
                <div>
                  <p className="font-semibold text-white">{member.username}</p>
                  {adminsList.includes(member.email) && (
                    <p className="text-sm text-gray-400">Admin</p>
                  )}
                </div>
                <button
                  onClick={() => handlePromote(member._id,classData?.data?.created_by)}
                  className="ml-auto text-blue-500 hover:text-blue-400"
                >
                  <ArrowUpCircle className="w-6 h-6" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Class Code Section */}
        <div className="mt-6 bg-gray-900 p-4 rounded-lg border border-gray-600 shadow-lg flex flex-col sm:flex-row items-center gap-4">
          <input
            type="text"
            value={classCode}
            readOnly
            className="flex-grow bg-transparent text-white text-lg font-semibold p-2 rounded-md border border-gray-500 focus:outline-none"
          />
          <button
            onClick={handleCopyClassCode}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-300 shadow-md w-full sm:w-auto"
          >
            Copy
          </button>
        </div>

        {/* Invite Button */}
        <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-300 shadow-md">
          Invite Classmate
        </button>
      </div>
    </div>
  );
};

export default ClassMembers;
