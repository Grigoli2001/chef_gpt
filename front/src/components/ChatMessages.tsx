import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import ChatLoader from "./ChatLoader";
const ChatMessages = ({
  chatBoxRef,
  chatHistory,
  isChatHistoryLoading,
  isLoading,

  chefImageRef,
}: {
  chatBoxRef: React.RefObject<HTMLDivElement>;
  chatHistory: { messages: { role: string; content: string }[] } | undefined;
  isChatHistoryLoading: boolean;
  isLoading: boolean;

  chefImageRef: React.MutableRefObject<string>;
}) => {
  const [loaderText, setLoaderText] = useState(
    "Preparing your culinary adventure..."
  );
  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  useEffect(() => {
    if (isLoading || isChatHistoryLoading) {
      const timeout10 = setTimeout(() => {
        setLoaderText("It takes time to load, my model is slow...");
      }, 10000);

      const timeout20 = setTimeout(() => {
        setLoaderText(
          "Still loading... Thank you for your patience. It may take a little more time."
        );
      }, 20000);

      const timeout30 = setTimeout(() => {
        setLoaderText("It's taking longer than expected...");
      }, 30000);

      const timeout50 = setTimeout(() => {
        setLoaderText("Almost there, just a little more patience...");
      }, 50000);

      return () => {
        clearTimeout(timeout10);
        clearTimeout(timeout20);
        clearTimeout(timeout30);
        clearTimeout(timeout50);
      };
    }
  }, [isLoading, isChatHistoryLoading]);
  return (
    <AnimatePresence>
      <div
        className="overflow-y-auto max-h-[calc(100vh-208px)] p-20"
        ref={chatBoxRef}
      >
        {isChatHistoryLoading || isLoading ? (
          <ChatLoader loaderText={loaderText} />
        ) : (
          (chatHistory?.messages || []).map((message, index) => (
            <motion.div
              key={index}
              variants={messageVariants}
              initial="hidden"
              animate="visible"
              className={`w-full my-2 flex ${
                message.role === "assistant" ? "justify-start" : "justify-end"
              }`}
            >
              {message.role === "assistant" && (
                <div className="w-10 h-10 bg-gray-600 rounded-full mr-2 object-cover">
                  <img
                    className="rounded-full size-full object-cover"
                    src={chefImageRef.current}
                    alt="avatar"
                  />
                </div>
              )}
              <div
                className={`flex ${
                  message.role === "assistant" ? "" : "bg-gray-600"
                } p-2 rounded-lg max-w-[70%] min-w-[200px] h-fit`}
              >
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.8 },
                  }}
                  transition={{ duration: 0.8 }}
                  className="typewriter"
                >
                  {message.content[0] === `"`
                    ? message.content.slice(1, -1)
                    : message.content}
                </motion.p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </AnimatePresence>
  );
};

export default ChatMessages;
