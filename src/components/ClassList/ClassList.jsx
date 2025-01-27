import { FaChalkboardTeacher, FaUserFriends, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useClass from "../../hooks/useClass";
import EmptyState from "../../shared/EmptyState";
import Loading from "../../shared/Loading/Loading";
import { useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
export default function ClassList() {
  const { useFetchClasses, useDeleteClass } = useClass();
  const { data: classList, isLoading, isError, error } = useFetchClasses();
  const deleteClassMutation = useDeleteClass();
  const {userData} = useAuth()
  console.log("classlist: ",classList)
  const queryClient = useQueryClient();
  const handleDelete = (classId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `<span class="px-4 py-1 mr-2 rounded-md transition-all duration-300 bg-gradient-to-r from-red-600/20 to-red-700/20 border border-blue-500/50 text-blue-400">Yes, delete it!</span>`,
      cancelButtonText: `<span class="px-4 py-1 rounded-md transition-all duration-300 bg-gradient-to-r from-gray-700/20 to-gray-800/20 border border-gray-500 text-gray-300">Cancel</span>`,
      customClass: {
        popup: "bg-gradient-to-b from-[#1F2A40] to-[#141B2D] text-white",
        title: "text-blue-400",
        text: "text-gray-300",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("classId: ",classId)
        deleteClassMutation.mutateAsync(classId)
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "The class has been successfully deleted.",
              icon: "success",
              confirmButtonText: `<span class="px-4 py-1 rounded-md transition-all duration-300 bg-gradient-to-r from-blue-500/20 to-teal-500/20 border border-blue-500/50 text-blue-400">OK</span>`,
              customClass: {
                popup: "bg-gradient-to-b from-[#1F2A40] to-[#141B2D] text-white",
                title: "text-blue-400",
                text: "text-gray-300",
              },
              buttonsStyling: false,
            });
            queryClient.invalidateQueries(["classes"]);
          })
          .catch(() => {
            Swal.fire({
              title: "Error!",
              text: "The class could not be deleted. Please try again.",
              icon: "error",
              confirmButtonText: `<span class="px-4 py-1 rounded-md transition-all duration-300 bg-gradient-to-r from-red-500/20 to-red-700/20 border border-red-500/50 text-red-400">OK</span>`,
              customClass: {
                popup: "bg-gradient-to-b from-[#1F2A40] to-[#141B2D] text-white",
                title: "text-red-400",
                text: "text-gray-300",
              },
              buttonsStyling: false,
            });
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Cancelled",
          text: "The class is safe and not deleted.",
          icon: "info",
          confirmButtonText: `<span class="px-4 py-1 rounded-md transition-all duration-300 bg-gradient-to-r from-blue-500/20 to-teal-500/20 border border-blue-500/50 text-blue-400">OK</span>`,
          customClass: {
            popup: "bg-gradient-to-b from-[#1F2A40] to-[#141B2D] text-white",
            title: "text-blue-400",
            text: "text-gray-300",
          },
          buttonsStyling: false,
        });
      }
    });
  };

  if (isLoading) return <Loading />;
  if (isError) return <p>Error: {error.message}</p>;

  const classes = classList?.data ?? [];

  return (
    <div>
      {classes.length === 0 ? (
        <EmptyState message="No classes available." />
      ) : (
        <div className="flex gap-8 px-6 py-8 flex-wrap">
          {classes.map((classItem) => (
            <div
              key={classItem._id}
              className="bg-gradient-to-r from-[#1F2A40] to-[#141B2D] rounded-lg shadow-lg transform transition-transform duration-300 w-80 h-72 p-6 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {classItem.class_name}
                </h2>
                <p className="text-gray-400 mb-4 line-clamp-3">
                  {classItem.description || "No description available."}
                </p>
              </div>
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <FaUserFriends
                      className="text-blue-500"
                      aria-label="Students"
                    />
                    <p className="text-sm text-gray-400">
                      Students: {classItem.members?.length || 0}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaChalkboardTeacher
                      className="text-green-500"
                      aria-label="Experts"
                    />
                    <p className="text-sm text-gray-400">
                      Experts: {classItem.experts?.length || 0}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link
                    to={`/dashboard/${classItem._id}`}
                    className="block w-full text-center bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded transition-all"
                  >
                    View Class
                  </Link>
                  {
                    userData?.user?._id === classItem?.created_by && <button
                    onClick={() => handleDelete(classItem._id)}
                    className="block px-3 text-center bg-red-600 hover:bg-red-500 text-white font-semibold py-2 rounded transition-all"
                  >
                    <FaTrashAlt aria-label="Delete Class" />
                  </button>
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
