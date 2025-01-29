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
import { useState } from "react";
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
  const { userData } = useAuth();
  const { useChangeRole } = useClass();
  const changeRoleMutation = useChangeRole();
  const queryClient = useQueryClient();
  const { classId } = useParams();
  const { useFetchClassesById } = useTask();
  const { data: classData } = useFetchClassesById(classId);
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleCopyClassCode = () => {
    navigator.clipboard.writeText(classCode);
    alert("Class code copied to clipboard!");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filterMembers = (list) => {
    return list.filter((member) =>
      member.username.toLowerCase().includes(searchTerm)
    );
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
              <div key={member._id} className="flex items-center space-x-4 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg shadow-md transition duration-300">
                <UserRoundCog className="text-yellow-400 w-10 h-10" />
                <div>
                  <p className="font-semibold text-yellow-400">{member.username}</p>
                </div>
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
              <div key={member._id} className="flex items-center space-x-4 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg shadow-md transition duration-300">
                <User className="w-10 h-10 text-gray-400" />
                <div>
                  <p className="font-semibold text-white">{member.username}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassMembers;
