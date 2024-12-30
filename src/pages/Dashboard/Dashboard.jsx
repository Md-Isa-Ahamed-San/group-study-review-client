
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
export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user } = useAuth();

  // Fetch users using React Query


  return (
    <>
    <DashboardNavbar setIsSidebarOpen={setIsSidebarOpen} />
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  </>
  );
}
