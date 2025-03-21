import React, { useState } from "react";
import ActiveTasks from "../ActiveTasks/ActiveTasks";
import CompletedTasks from "../CompletedTasks/CompletedTasks";
import ClassMembers from "../ClassMembers/ClassMembers";
import { useParams } from "react-router-dom";
import useTask from "../../hooks/useTask";
import Loading from "../../shared/Loading/Loading";

const Class = ({ setToggleCreateTaskModal }) => {
  const { classId } = useParams();
  const { useFetchClassesById } = useTask();

  // Fetch class data using the ID
  const {
    data: classData,
    isLoading,
    isError,
    error,
  } = useFetchClassesById(classId);

  const activeTasks = classData?.data?.tasks?.filter(
    (task) => task.status === "ongoing"
  );
  const completedTasks = classData?.data?.tasks?.filter(
    (task) => task.status === "completed"
  );

  const [activeTab, setActiveTab] = useState("activeTasks");

  if (isLoading) return <Loading />;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="flex-1 flex flex-col transition-all duration-300 p-4">
      {/* Tabs for XL and smaller screens */}
      <div className="block 2xl:hidden">
        <div className="flex border-b mb-4">
          <button
            className={`flex-1 py-2 text-center ${
              activeTab === "activeTasks"
                ? "border-b-2 border-blue-500 font-bold"
                : ""
            }`}
            onClick={() => setActiveTab("activeTasks")}
          >
            Active Tasks
          </button>
          <button
            className={`flex-1 py-2 text-center ${
              activeTab === "completedTasks"
                ? "border-b-2 border-blue-500 font-bold"
                : ""
            }`}
            onClick={() => setActiveTab("completedTasks")}
          >
            Completed
          </button>
          <button
            className={`flex-1 py-2 text-center ${
              activeTab === "classMembers"
                ? "border-b-2 border-blue-500 font-bold"
                : ""
            }`}
            onClick={() => setActiveTab("classMembers")}
          >
            Members
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "activeTasks" && (
          <ActiveTasks
            tasks={activeTasks}
            setToggleCreateTaskModal={setToggleCreateTaskModal}
          />
        )}
        {activeTab === "completedTasks" && (
          <CompletedTasks tasks={completedTasks} />
        )}
        {activeTab === "classMembers" && (
          <ClassMembers
            members={classData?.data?.members}
            experts={classData?.data?.experts}
            admins={classData?.data?.admins}
            classCode={classData?.data?.class_code}
          />
        )}
      </div>

      {/* Grid Layout for 2XL Screens */}
      <div className="hidden 2xl:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <ActiveTasks
            tasks={activeTasks}
            setToggleCreateTaskModal={setToggleCreateTaskModal}
          />
        </div>
        <div>
          <CompletedTasks tasks={completedTasks} />
        </div>
        <div>
          <ClassMembers
            members={classData?.data?.members}
            experts={classData?.data?.experts}
            admins={classData?.data?.admins}
            classCode={classData?.data?.class_code}
          />
        </div>
      </div>
    </div>
  );
};

export default Class;
