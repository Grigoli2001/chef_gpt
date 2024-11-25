import { useState, useRef, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useSidebar } from "../context/UseSidebar";
import { Outlet } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useAuth } from "../context/UseAuth";
import { motion, AnimatePresence } from "framer-motion";
const Layout = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuth();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const dropdownVariants = {
    open: {
      height: "auto",
      opacity: 1,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex-1 bg-gray-700 h-full flex flex-col">
        {/* Header remains static in height */}
        <header className="flex items-center p-4 h-16 justify-between">
          <div className="flex items-center">
            {!isSidebarOpen && (
              <button
                className="bg-gray-700 p-2 rounded-xl mr-4"
                onClick={() => setIsSidebarOpen(true)}
              >
                <MenuIcon />
              </button>
            )}
            <h1 className="text-2xl font-bold cursor-default">Chef GPT</h1>
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center bg-gray-700 p-2 rounded-full transition duration-300 hover:bg-gray-600"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <AccountCircleIcon className="text-white" />
              <ArrowDropDownIcon className="text-white" />
            </button>
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-md shadow-lg z-10 p-2"
                  variants={dropdownVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  <motion.button
                    className="block w-full text-left px-4 py-2 text-gray-100 hover:bg-gray-800 transition duration-300 rounded-md"
                    onClick={logout}
                  >
                    Logout
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
