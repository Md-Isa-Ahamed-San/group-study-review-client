import React, { useState } from "react";
import ActiveTasks from "./components/ActiveTasks/ActiveTasks";
import CompletedTasks from "./components/CompletedTasks/CompletedTasks";
import Sidebar from "./components/Sidebar/Sidebar";
import ClassMembers from "./components/ClassMembers/ClassMembers";
import DashboardNavbar from "./components/DashboardNavbar/DashboardNavbar";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
      <DashboardNavbar setIsSidebarOpen={setIsSidebarOpen} />
      <div className="flex h-screen bg-gray-900 text-gray-100">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <div
          className={`flex-1 flex flex-col transition-all duration-300 `}
        >
          <div className="flex-1 p-6 grid grid-cols-1 md:grid-cols-3 gap-6 overflow-auto">
            <ActiveTasks />
            <CompletedTasks />
            <ClassMembers />
          </div>
        </div>
      </div>
    </>
  );
}
