import { Outlet } from "react-router-dom";
import AdminsSidebar from "../sharedComponents/AdminsSidebar";
import AdminsNavbar from "../sharedComponents/AdminsNavbar";

const AdminsLayout = () => {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr]">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <AdminsNavbar />
      </div>
      {/* Main grid layout */}
      <div className="grid grid-cols-8 sm:grid-cols-7 md:grid-cols-7 lg:grid-cols-5 mt-[64px]">
        {/* Fixed Sidebar */}
        <div className="fixed col-span-2 sm:col-span-2 lg:col-span-1 top-[64px] left-0 h-[calc(100vh-64px)] w-[240px] bg-[#001844] z-40">
          <AdminsSidebar />
        </div>
        {/* Scrollable content */}
        <div className="col-span-6 sm:col-span-5 md:col-span-5 lg:col-span-5 ml-[240px] p-6  bg-gray-100 h-[calc(100vh-64px)] overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminsLayout;
