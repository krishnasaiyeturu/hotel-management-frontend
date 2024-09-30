import { Outlet } from "react-router-dom";
import Footer from "../components/Shared/Footer";
// import Navbar from "../components/Shared/Navbar";
import Navbar from "../components/SharedCompoenents/Navbar";

const MainLayout = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
