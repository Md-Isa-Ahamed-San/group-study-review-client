import { FaChalkboardTeacher, FaUserFriends } from "react-icons/fa";
import { Link } from "react-router-dom";
import useClass from "../../hooks/useClass";
import EmptyState from "../../shared/EmptyState";

export default function ClassList() {
  const { useFetchClasses } = useClass();
  const { data: classList, isLoading, isError, error } = useFetchClasses();

  console.log("class list inside ClassList component: ", classList);

  if (isLoading) return <p>Loading Classes...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const classes = classList?.data ?? []; // Fallback to an empty array

  return (
    <div>
      {classes.length === 0 ? (
        <EmptyState message="No classes available." />
      ) : (
        <div className="flex gap-8 px-6 py-8 flex-wrap">
          {classes.map((classItem) => (
            <div
              key={classItem._id}
              className="bg-gradient-to-r from-[#1F2A40] to-[#141B2D]  rounded-lg shadow-lg transform transition-transform duration-300 w-80 h-72 p-6 flex flex-col justify-between"
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
                <Link
                  to={`/dashboard/${classItem._id}`}
                  className="block w-full text-center bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded transition-all"
                >
                  View Class
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
