import { Outlet } from "react-router-dom";
import Sidebar from "../dashboard/Sidebar/Sidebar";

const DashboardLayouts = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      <div className="flex">
        {/* Sidebar Component */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-x-hidden">
          {/* Content Container */}
          <div className="max-w-[2000px] mx-auto">
            {/* Dynamic Content */}
            <div className="backdrop-blur-sm bg-blue-950/20 rounded-xl border border-blue-800/30 shadow-xl">
              <div className="p-4 lg:p-6">
                <Outlet />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayouts;
