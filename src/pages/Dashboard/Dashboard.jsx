import { useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import DashboardNavbar from "../../components/DashboardNavbar/DashboardNavbar";
import ClassCreateModal from "../../components/Modals/ClassCreateModal";
import JoinClassModal from "../../components/Modals/JoinClassModal";
import TaskModal from "../../components/Modals/TaskModal";
import Sidebar from "../../components/Sidebar/Sidebar";
import useAuth from "../../hooks/useAuth";
import useClass from "../../hooks/useClass";
import useTask from "../../hooks/useTask";
export default function Dashboard() {
  
  const {
    toggleJoinClassModal,
    setToggleJoinClassModal,
    toggleClassCreateModal,
    setToggleClassCreateModal,
  } = useClass();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { toggleCreateTaskModal } = useTask();
  const { user } = useAuth();

  // Fetch usersClasslist using React Query
  const { classId } = useParams();

  return (
    <div className="flex flex-col h-screen">
      <DashboardNavbar setIsSidebarOpen={setIsSidebarOpen} />
      <div className="flex h-screen bg-gray-900 text-gray-100">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setToggleClassCreateModal={setToggleClassCreateModal}
          setToggleJoinClassModal={setToggleJoinClassModal}
        />
        <div className="flex-1 p-4 relative">
          <Outlet />
          {toggleClassCreateModal ? (
            <div className="absolute">
              <ClassCreateModal
                setToggleClassCreateModal={setToggleClassCreateModal}
              />
            </div>
          ) : null}
          {toggleJoinClassModal ? (
            <div className="absolute">
              <JoinClassModal
                setToggleJoinClassModal={setToggleJoinClassModal}
              />
            </div>
          ) : null}
          {toggleCreateTaskModal &&
            <div className="absolute">
              <TaskModal key={new Date()} class_id={classId} />
            </div>
          }
        </div>
      </div>
    </div>
  );
}
