/* eslint-disable react/prop-types */

import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import useClass from "../../hooks/useClass";
import { Link } from "react-router-dom";
import Loading from "../../shared/Loading/Loading";
const Sidebar = ({
  isSidebarOpen,
  setToggleClassCreateModal,
  setToggleJoinClassModal,
}) => {
  const { userData } = useAuth();
  const { useFetchClasses } = useClass();
  const { data: classList, isLoading, isError, error } = useFetchClasses();
  // console.log("class list inside sidebar: ", classList);
  if (isLoading) return <p className="p-4 text-xl">Loading Sidebar...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  // console.log("userdata: ", userData);
  return (
    <AnimatePresence>
      {isSidebarOpen && (
        <motion.div
          initial={{ x: -300 }} // Start from offscreen (left)
          animate={{ x: 0 }} // Animate to onscreen
          exit={{ x: -300 }} // Slide off to the right when closing
          transition={{ type: "spring", stiffness: 400, damping: 30 }} // Smooth transition
          className="p-6 py-10  bottom-0 w-64 bg-gray-800 text-white shadow-lg"
        >
          
          <button
            onClick={() => setToggleJoinClassModal(true)}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            Join a Class
          </button>
          <button
            onClick={() => setToggleClassCreateModal(true)}
            className="w-full mt-4 py-2 px-4 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition duration-300"
          >
            Create a Class
          </button>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2 text-gray-400">
              My Classes
            </h3>
            <ul className="space-y-2">
              {classList?.data?.map((classItem,idx) => (
                <Link 
                // key={idx}
                key={classItem._id}
                 to={`/dashboard/${classItem._id}`}>
                  <li
                    // Assuming each class item has a unique `_id`
                    className="py-2 my-2 px-4 text-center bg-gray-700 rounded-md hover:bg-gray-600 transition duration-300"
                  >
                    {classItem.class_name}{" "}
                    {/* Display the title of the class */}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
