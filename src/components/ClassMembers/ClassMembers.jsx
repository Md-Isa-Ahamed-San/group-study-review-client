/* eslint-disable react/prop-types */
import { useQueryClient } from "@tanstack/react-query";
import { Search, User, UserRoundCog, EllipsisVertical, X } from "lucide-react";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useClass from "../../hooks/useClass";
import useTask from "../../hooks/useTask";

const ClassMembers = ({ members, experts, classCode }) => {
  const { userData } = useAuth();
  const { useChangeRole } = useClass();
  const changeRoleMutation = useChangeRole();
  const queryClient = useQueryClient();
  const { useFetchClassesById } = useTask();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filterMembers = (list) => {
    return list.filter((member) =>
      member.username.toLowerCase().includes(searchTerm)
    );
  };

  // Handle Role Change (Promote or Demote)
  const handleChangeRole = async (userId, action) => {
    try {
      await changeRoleMutation.mutateAsync({
        userId,
        classCode,
        creator: userData?.user?._id,
      });
      queryClient.invalidateQueries(["classMembers"]);
      setSelectedUser(null); // Close modal
    } catch (error) {
      console.error("Role change error:", error);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto relative">
      <h2 className="text-2xl font-bold mb-6 text-blue-500 text-center lg:text-left">
        Class Members
      </h2>
      <div className="bg-gradient-to-br from-[#1F2A40] to-[#141B2D] p-6 rounded-lg shadow-lg border border-gray-700">
        {/* Search Section */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search members..."
            value={searchTerm}
            onChange={handleSearchChange}
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
            {filterMembers(experts).map((member) => (
              <div
                key={member._id}
                className="flex items-center justify-between p-3 bg-gray-800 hover:bg-gray-700 rounded-lg shadow-md transition duration-300"
              >
                <div className="flex items-center space-x-4">
                  <UserRoundCog className="text-yellow-400 w-10 h-10" />
                  <p className="font-semibold text-yellow-400">
                    {member.username}
                  </p>
                </div>

                <EllipsisVertical
                  className="w-6 h-6 text-white cursor-pointer"
                  onClick={() => setSelectedUser({ ...member, action: "demote" })}
                />
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
            {filterMembers(members).map((member) => (
              <div
                key={member._id}
                className="flex items-center justify-between p-3 bg-gray-800 hover:bg-gray-700 rounded-lg shadow-md transition duration-300"
              >
                <div className="flex items-center space-x-4">
                  <User className="w-10 h-10 text-gray-400" />
                  <p className="font-semibold text-white">{member.username}</p>
                </div>

                <EllipsisVertical
                  className="w-6 h-6 text-white cursor-pointer"
                  onClick={() => setSelectedUser({ ...member, action: "promote" })}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Global Modal for Promotion/Demotion */}
      {selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white w-80 relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
              onClick={() => setSelectedUser(null)}
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-semibold text-center mb-4">
              {selectedUser.action === "promote"
                ? "Promote to Expert"
                : "Demote to Member"}
            </h3>

            <p className="text-center text-gray-300 mb-6">
              Are you sure you want to {selectedUser.action}{" "}
              <span className="font-bold">{selectedUser.username}</span>?
            </p>

            <div className="flex justify-center gap-4">
              <button
                className="bg-gray-600 px-4 py-2 rounded-md"
                onClick={() => setSelectedUser(null)}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 rounded-md ${
                  selectedUser.action === "promote"
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-red-500 hover:bg-red-600"
                }`}
                onClick={() =>
                  handleChangeRole(selectedUser._id, selectedUser.action)
                }
              >
                {selectedUser.action === "promote" ? "Promote" : "Demote"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassMembers;
