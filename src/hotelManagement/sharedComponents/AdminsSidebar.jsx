import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faDoorOpen,
  faClipboardCheck,
  faMoneyBillWave,
  faUserFriends,
  faCogs,
} from "@fortawesome/free-solid-svg-icons"; // Import relevant icons

const menuItems = [
  { to: "dashboard", icon: faTachometerAlt, title: "Dashboard" },
  { to: "room-inventory", icon: faDoorOpen, title: "Room Inventory" },
  { to: "front-desk", icon: faClipboardCheck, title: "FrontDesk" },
  { to: "transactions", icon: faMoneyBillWave, title: "Transactions" },
  { to: "agents", icon: faUserFriends, title: "Agents" },
  { to: "settings", icon: faCogs, title: "Settings" },
];

const AdminsSidebar = () => {
  const { pathname } = useLocation();

  return (
    <aside className="bg-[#001844] text-white h-screen py-6 pl-2 pr-4">
      <ul className="space-y-6">
        {menuItems.map(({ to, icon, title }) => (
          <li key={to}>
            <Link
              to={to}
              className={`${
                pathname.includes(`/admin/${to}`) // Use includes for route matching
                  ? "text-blue-600 bg-[#001f53]"
                  : "text-white bg-[#001844]"
              } hover:text-blue-600 block py-2 px-4 hover:bg-[#001844] hover:text-gray-500 rounded-md grid grid-cols-[auto_1fr] items-center transition-all duration-200`}
            >
              <div className="flex items-center justify-center w-6 h-6">
                <FontAwesomeIcon icon={icon} />
              </div>
              <span className="ml-4">{title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default AdminsSidebar;
