import { Outlet } from "react-router-dom";
import MobileLogoutButton from "./MobileLogoutButton";
import SideBar from "./SideBar";

function DashboardLayout() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col md:flex-row">
      <SideBar />

      <div className="w-full md:w-3/4 p-4 md:p-10">
        <MobileLogoutButton />
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
