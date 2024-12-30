import { FaChalkboardTeacher, FaUserFriends } from "react-icons/fa";
import { Link } from "react-router-dom";
import useClass from "../../hooks/useClass";
import EmptyState from "../../shared/EmptyState";

export default function ClassList() {
  // Fetch users using React Query
  const { useFetchClasses } = useClass();

  const { data: classList, isLoading, isError, error } = useFetchClasses();
  console.log("classList : ", classList);

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      {classList?.data ? (
        <div className="gg">
          {classList?.data.length === 0 ? (
            <EmptyState message="Empty" />
          ) : null}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 py-8">
          {classList?.data?.map((classItem) => (
            <div
              key={classItem._id}
              className="bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 w-80 h-96 p-6 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {classItem.class_name}
                </h2>
                <p className="text-gray-400 mb-4 line-clamp-3">
                  {classItem.description}
                </p>
              </div>
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <FaUserFriends className="text-blue-500" />
                    <p className="text-sm text-gray-400">
                      Students: {classItem.members.length}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaChalkboardTeacher className="text-green-500" />
                    <p className="text-sm text-gray-400">
                      Experts: {classItem.experts.length}
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
