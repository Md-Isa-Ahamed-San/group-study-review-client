import React from "react";
import ActiveTasks from "../ActiveTasks/ActiveTasks";
import CompletedTasks from "../CompletedTasks/CompletedTasks";
import ClassMembers from "../ClassMembers/ClassMembers";
import { useParams } from "react-router-dom";
import useTask from "../../hooks/useTask";
import Loading from "../../shared/Loading/Loading";

const Class = ({ setToggleCreateTaskModal }) => {
  const { classId } = useParams(); // Get the class ID from the route params
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

  if (isLoading) return <Loading />;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="flex-1 flex flex-col transition-all duration-300">
      <div className="flex-1 p-6 flex flex-col md:flex-row gap-6 overflow-auto flex-wrap">
        <div className="flex-1">
          <ActiveTasks
            tasks={activeTasks}
            setToggleCreateTaskModal={setToggleCreateTaskModal}
          />
        </div>
        <div className="flex-1">
          <CompletedTasks tasks={completedTasks} />
        </div>
        <div className="flex-1">
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