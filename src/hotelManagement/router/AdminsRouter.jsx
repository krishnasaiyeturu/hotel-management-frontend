import { Suspense } from "react";
import AdminsLayout from "../layout/AdminsLayout";
import SignUp from "../../components/auth/SignUp";
import { FadeLoader } from "react-spinners";
import Dashboard from "../pages/dashboard/Dashboard";
import RoomInventory from "../pages/roomInventory/RoomInventory";
import Checkouts from "../pages/checkouts/CheckOuts";
import Transactions from "../pages/transactions/Transactions";
import Agents from "../pages/agents/Agents";
import Settings from "../pages/settings/Settings";
import SignIn from "../../components/auth/SignIn";
import RoomCreatorAndEditor from "../pages/roomInventory/RoomCreaterAndEditer";

const adminsRouter = [
  {
    path: "/admin",
    element: <AdminsLayout />,
    children: [
      {
        path: "dashboard",
        element: (
          <Suspense
            fallback={
              <div className=" flex justify-center items-center w-full h-[60dvh]">
                <FadeLoader color="#000" />
              </div>
            }
          >
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "room-inventory",
        element: (
          <Suspense
            fallback={
              <div className=" flex justify-center items-center w-full h-[60dvh]">
                <FadeLoader color="#000" />
              </div>
            }
          >
            <RoomInventory />
          </Suspense>
        ),
      },
      {
        path: "room-inventory/create-room",
        element: (
          <Suspense
            fallback={
              <div className=" flex justify-center items-center w-full h-[60dvh]">
                <FadeLoader color="#000" />
              </div>
            }
          >
            <RoomCreatorAndEditor />
          </Suspense>
        ),
      },
      {
        path: "checkouts",
        element: (
          <Suspense
            fallback={
              <div className=" flex justify-center items-center w-full h-[60dvh]">
                <FadeLoader color="#000" />
              </div>
            }
          >
            <Checkouts />
          </Suspense>
        ),
      },
      {
        path: "transactions",
        element: (
          <Suspense
            fallback={
              <div className=" flex justify-center items-center w-full h-[60dvh]">
                <FadeLoader color="#000" />
              </div>
            }
          >
            <Transactions />
          </Suspense>
        ),
      },
      {
        path: "agents",
        element: (
          <Suspense
            fallback={
              <div className=" flex justify-center items-center w-full h-[60dvh]">
                <FadeLoader color="#000" />
              </div>
            }
          >
            <Agents />
          </Suspense>
        ),
      },
      {
        path: "settings",
        element: (
          <Suspense
            fallback={
              <div className=" flex justify-center items-center w-full h-[60dvh]">
                <FadeLoader color="#000" />
              </div>
            }
          >
            <Settings />
          </Suspense>
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
