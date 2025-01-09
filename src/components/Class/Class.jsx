import React from "react";
import ActiveTasks from "../ActiveTasks/ActiveTasks";
import CompletedTasks from "../CompletedTasks/CompletedTasks";
import ClassMembers from "../ClassMembers/ClassMembers";
import { useParams } from "react-router-dom";
import useTask from "../../hooks/useTask";

const Class = ({ setToggleCreateTaskModal }) => {
  const { id } = useParams(); // Get the class ID from the route params
  const { useFetchClassesById } = useTask();
  // console.log("id of class inside class :",id)
  // Fetch class data using the ID
  const {
    data: classData,
    isLoading,
    isError,
    error,
  } = useFetchClassesById(id);

  const activeTasks = classData?.data?.tasks?.filter(
    (task) => task.status === "ongoing"
  );
  const completedTasks = classData?.data?.tasks?.filter(
    (task) => task.status === "completed"
  );
  // console.log("🚀 ~ Class ~ completedTasks:", completedTasks)
  console.log("classData: ",classData)
  if (isLoading) return <p>Loading class details...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="flex-1 flex flex-col transition-all duration-300">
      <div className="flex-1 p-6 grid grid-cols-1 md:grid-cols-3 gap-6 overflow-auto">
        <ActiveTasks
          tasks={activeTasks}
          setToggleCreateTaskModal={setToggleCreateTaskModal}
        />
        <CompletedTasks tasks={completedTasks} />
        <ClassMembers
          members={classData?.data?.members}
          experts={classData?.data?.experts}
          admins ={classData?.data?.admins}
          classCode={classData?.data?.class_code}
        />
      </div>
    </div>
  );
};

export default Class;
