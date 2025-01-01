
import axios from "axios";
import { useState } from "react";
import ActiveTasks from "../../components/ActiveTasks/ActiveTasks";
import ClassMembers from "../../components/ClassMembers/ClassMembers";
import CompletedTasks from "../../components/CompletedTasks/CompletedTasks";
import DashboardNavbar from "../../components/DashboardNavbar/DashboardNavbar";
import {Outlet} from "react-router-dom"
import Sidebar from "../../components/Sidebar/Sidebar";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import ClassCreateModal from "../../components/Modals/ClassCreateModal";
import JoinClassModal from "../../components/Modals/JoinClassModal";
export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [toggleClassCreateModal,setToggleClassCreateModal] = useState(false);
  const [toggleJoinClassModal,setToggleJoinClassModal] = useState(false)
  const { user } = useAuth();

  // Fetch usersClasslist using React Query


  return (
    <>
    <DashboardNavbar setIsSidebarOpen={setIsSidebarOpen}  />
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} setToggleClassCreateModal={setToggleClassCreateModal} setToggleJoinClassModal={setToggleJoinClassModal} />
      <div className="flex-1 p-4 relative">
        <Outlet />
        {
          toggleClassCreateModal? (<div className="absolute"><ClassCreateModal setToggleClassCreateModal={setToggleClassCreateModal}/></div>):null
        }
        {
          toggleJoinClassModal? (<div className="absolute"><JoinClassModal setToggleJoinClassModal={setToggleJoinClassModal}/></div>):null
        }
      </div>
    </div>
  </>
  );
}
