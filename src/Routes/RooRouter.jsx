import { createBrowserRouter } from "react-router-dom";
import router from "./Routes/Route";
import adminsRouter from "../hotelManagement/router/AdminsRouter";

const rootRouter = createBrowserRouter([...router, ...adminsRouter]);

export default rootRouter;
