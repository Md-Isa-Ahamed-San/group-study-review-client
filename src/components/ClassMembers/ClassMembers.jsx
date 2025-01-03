import { useMemo } from "react";
import {
  ArrowUpDown,
  Bell,
  Book,
  Home,
  Search,
  Settings,
  Star,
  ThumbsUp,
  User,
} from "lucide-react";
const ClassMembers = ({members,experts}) => {
 
console.log(members,experts)
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-teal-400">Class Members</h2>
      <div className="bg-gradient-to-br from-[#1F2A40] to-[#141B2D] p-4 rounded-lg shadow-lg border border-gray-700">
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Search members..."
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-l-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button className="bg-teal-500 hover:bg-teal-600 text-white p-2 rounded-r-md transition duration-300">
            <Search className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-teal-400 mb-2">
              Experts
            </h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {experts?.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded transition duration-300"
                >
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-10 h-10 rounded-full border-2 border-yellow-400"
                  />
                  <div>
                    <p className="font-semibold text-white">{member.name}</p>
                    <p className="text-sm text-yellow-400 flex items-center">
                      Expert <Star className="h-4 w-4 ml-1" />
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-teal-400 mb-2">
             Members
            </h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {members?.map((member) => (
                <div
                  key={member._id}
                  className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded transition duration-300"
                >
                  <img
                    src={member.profile_picture}
                    alt={member.username}
                    className="w-10 h-10 rounded-full border-2 border-gray-600"
                  />
                  <div>
                    <p className="font-semibold text-white">{member.username}</p>
                    <p className="text-sm text-gray-400">Student</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button className="mt-4 w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded transition duration-300">
          Invite Classmate
        </button>
      </div>
    </div>
  );
};

export default ClassMembers;
