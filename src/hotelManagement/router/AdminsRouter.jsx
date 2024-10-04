import { Suspense } from "react";
import AdminsLayout from "../layout/AdminsLayout";
import SignUp from "../../components/auth/SignUp";
import { FadeLoader } from "react-spinners";
import Dashboard from "../pages/dashboard/Dashboard";
import RoomInventory from "../pages/roomInventory/RoomInventory";
import Transactions from "../pages/transactions/Transactions";
import Agents from "../pages/agents/Agents";
import Settings from "../pages/settings/Settings";
import SignIn from "../../components/auth/SignIn";
import RoomCreatorAndEditor from "../pages/roomInventory/RoomCreaterAndEditer";
import FrontDesk from "../pages/frontDesk/FrontDesk";
import ProtectedRoute from "./ProtectedRoute";

const adminsRouter = [
  {
    path: "/admin",
    element: <AdminsLayout />,
    children: [
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Suspense
              fallback={
                <div className=" flex justify-center items-center w-full h-[60dvh]">
                  <FadeLoader color="#000" />
                </div>
              }
            >
              <Dashboard />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "room-inventory",
        element: (
          <ProtectedRoute>
            <Suspense
              fallback={
                <div className=" flex justify-center items-center w-full h-[60dvh]">
                  <FadeLoader color="#000" />
                </div>
              }
            >
              <RoomInventory />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "room-inventory/create-room",
        element: (
          <ProtectedRoute>
          <Suspense
            fallback={
              <div className=" flex justify-center items-center w-full h-[60dvh]">
                <FadeLoader color="#000" />
              </div>
            }
          >
            <RoomCreatorAndEditor />
          </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "room-inventory/edit-room",
        element: (
          <ProtectedRoute>
          <Suspense
            fallback={
              <div className=" flex justify-center items-center w-full h-[60dvh]">
                <FadeLoader color="#000" />
              </div>
            }
          >
            <RoomCreatorAndEditor />
          </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "front-desk",
        element: (
          <ProtectedRoute>
          <Suspense
            fallback={
              <div className=" flex justify-center items-center w-full h-[60dvh]">
                <FadeLoader color="#000" />
              </div>
            }
          >
            <FrontDesk />
          </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "transactions",
        element: (
          <ProtectedRoute>
          <Suspense
            fallback={
              <div className=" flex justify-center items-center w-full h-[60dvh]">
                <FadeLoader color="#000" />
              </div>
            }
          >
            <Transactions />
          </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "agents",
        element: (
          <ProtectedRoute>
          <Suspense
            fallback={
              <div className=" flex justify-center items-center w-full h-[60dvh]">
                <FadeLoader color="#000" />
              </div>
            }
          >
            <Agents />
          </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <ProtectedRoute>
          <Suspense
            fallback={
              <div className=" flex justify-center items-center w-full h-[60dvh]">
                <FadeLoader color="#000" />
              </div>
            }
          >
            <Settings />
          </Suspense>
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/admin/sign-up",
    element: <SignUp />,
  },
  {
    path: "/admin/sign-in",
    element: <SignIn />,
  },
];

export default adminsRouter;
