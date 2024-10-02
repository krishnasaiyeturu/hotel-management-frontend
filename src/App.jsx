import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import rootRouter from "./Routes/RooRouter";
import "./custom.css";

function App() {
  return (
    <>
      <RouterProvider router={rootRouter} />
      <Toaster></Toaster>
    </>
  );
}

export default App;
