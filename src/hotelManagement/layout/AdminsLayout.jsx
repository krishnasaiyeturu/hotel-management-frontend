import { Outlet } from "react-router-dom";
import AdminsSidebar from "../sharedComponents/AdminsSidebar";
import AdminsNavbar from "../sharedComponents/AdminsNavbar";

const AdminsLayout = () => {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr]">
      {/* Navbar */}
      <AdminsNavbar />
      {/* Main content */}
      <div className="grid grid-cols-8 sm:grid-cols-7 md:grid-cols-7 lg:grid-cols-5">
        {" "}
        {/* Add responsive classes */}
        {/* Sidebar */}
        <div className="col-span-2 sm:grid-cols-2 md:col-span-2 lg:col-span-1">
          {" "}
          {/* Occupies 20% */}
          <AdminsSidebar />
        </div>
        {/* Outlet content */}
        <div className="col-span-6 sm:grid-cols-5 md:grid-cols-5 lg:col-span-4 p-6 bg-gray-100">
          {" "}
          {/* Occupies 80% */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminsLayout;

// <div className="min-h-screen grid grid-rows-[auto_1fr]">
//   {/* Navbar */}
//   <AdminsNavbar />
//   {/* Main content */}
//   <div className="grid grid-cols-12">
//     {/* Sidebar */}
//     <div className="col-span-2">
//       <AdminsSidebar />
//     </div>

//     {/* Outlet content */}
//     <div className="col-span-10 p-6 bg-gray-100">
//       <Outlet />
//     </div>
//   </div>
// </div>;
