import { Outlet } from "react-router-dom";
import Sidebar from "../dashboard/Sidebar/Sidebar";

const SIDEBAR_WIDTH = "16rem"; // w-64

const DashboardLayouts = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      {/* Sidebar */}
      <aside
        className="fixed top-0 left-0 h-screen"
        style={{ width: SIDEBAR_WIDTH }}
      >
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main
        className="ml-64 p-4 lg:p-6 overflow-x-hidden"
        style={{ minHeight: "100vh" }}
      >
        <div className="max-w-[2000px] mx-auto">
          <div className="backdrop-blur-sm bg-blue-950/20 rounded-xl border border-blue-800/30 shadow-xl">
            <div className="p-4 lg:p-6">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayouts;
