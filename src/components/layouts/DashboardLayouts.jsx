import { Outlet } from "react-router-dom";
import Sidebar from "../dashboard/Sidebar/Sidebar";

const DashboardLayouts = () => {
  return (
    <div className="relative min-h-screen md:flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Outlet --> Dynamic content */}
      <div className="flex-1">
        <div className="p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayouts;
