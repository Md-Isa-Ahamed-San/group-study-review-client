import { useState } from "react";
import DashboardNavbar from "../../components/DashboardNavbar/DashboardNavbar";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import useAuth from "../../hooks/useAuth";
import ClassCreateModal from "../../components/Modals/ClassCreateModal";
import JoinClassModal from "../../components/Modals/JoinClassModal";
import TaskModal from "../../components/Modals/TaskModal";
import useClass from "../../hooks/useClass";
import useTask from "../../hooks/useTask";
import {useParams} from 'react-router-dom'
export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const {
    toggleJoinClassModal,
    setToggleJoinClassModal,
    toggleClassCreateModal,
    setToggleClassCreateModal,
  } = useClass();
  const {toggleCreateTaskModal} =useTask()
  const { user } = useAuth();

  // Fetch usersClasslist using React Query
  const {id}  = useParams();

  return (
    <>
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
          {toggleCreateTaskModal ? (
            <div className="absolute">
              <TaskModal
              class_id={id}
              />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
