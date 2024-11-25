import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import CloseIcon from "@mui/icons-material/Close"; // Import CloseIcon
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserChats } from "../api/gpt";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

// TODO: Replace with actual chat history

const Sidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}) => {
  const navigate = useNavigate();
  const { data: chats } = useQuery({
    queryKey: ["chats"],
    queryFn: getUserChats,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isSidebarFullyOpen, setIsSidebarFullyOpen] = useState(isSidebarOpen);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleTransitionEnd = () => {
    setIsSidebarFullyOpen(isSidebarOpen);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ width: "0" }}
        animate={{ width: isSidebarOpen ? (isMobile ? "100%" : "250px") : "0" }}
        exit={{ width: "0" }}
        transition={{ duration: 0.1 }}
        onTransitionEnd={handleTransitionEnd}
        className={`${
          isSidebarOpen ? (isMobile ? "w-full" : "w-64 p-2") : "w-0"
        } bg-backgroundGray overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-[20px] text-white flex-shrink-0 transition-all duration-300 fixed md:relative z-50 md:z-auto`}
      >
        {isSidebarFullyOpen && (
          <div>
            <div className="flex justify-between">
              <div
                className="p-2 cursor-pointer hover:bg-gray-700 w-fit rounded-xl"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <span className="material-icons">
                  {isSidebarOpen && isMobile ? <CloseIcon /> : <MenuIcon />}
                </span>
              </div>

              <div
                className="hover:bg-gray-700 w-fit rounded-xl p-2 cursor-pointer"
                onClick={handleHomeClick}
              >
                <span>
                  <HomeIcon />
                </span>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              exit={{ opacity: 0 }}
              className={`p-4 ${isSidebarOpen ? "" : "invisible"}`}
            >
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1 }}
                exit={{ opacity: 0 }}
                className={`text-lg font-bold mb-4 absolute `}
              >
                Conversation History
              </motion.h2>

              <div className="space-y-4 mt-10">
                {chats?.chats.map(
                  (item) =>
                    item.messages.length > 0 && (
                      <div
                        key={item._id}
                        className="p-2 bg-gray-700 rounded hover:bg-gray-600 cursor-pointer"
                        onClick={() =>
                          navigate(
                            `/chat?id=${item.chat_session_id}&chef=${item.chef_name}`,
                            {
                              state: {
                                chatId: item.chat_session_id,
                                chef: item.chef_name,
                              },
                            }
                          )
                        }
                      >
                        <p className="text-sm truncate text-center">
                          {item.messages[0].content.slice(0, 8) +
                            "..." +
                            item.chef_name}
                        </p>
                      </div>
                    )
                )}
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default Sidebar;
