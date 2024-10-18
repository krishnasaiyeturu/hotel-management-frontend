import toast, { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import rootRouter from "./Routes/RooRouter";
import "./custom.css";
import { loadGtagScript } from "./hotelManagement/ga/GoogleAnalytics";
import { useEffect } from "react";
import { SEO } from "./SEO";

function App() {
  const googleTagId = import.meta.env.VITE_APP_GOOGLE_TAG_ID;

  if (!googleTagId) {
    toast.warn("Google Analytics Id is missing");
  }
  useEffect(() => {
    loadGtagScript(googleTagId);
  }, [googleTagId]);

  return (
    <>
      <SEO />
      <RouterProvider router={rootRouter} />
      <Toaster></Toaster>
    </>
  );
}

export default App;
