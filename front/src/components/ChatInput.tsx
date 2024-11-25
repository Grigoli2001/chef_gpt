import { FallingLines } from "react-loader-spinner";
import SendIcon from "@mui/icons-material/Send";

const ChatInput = ({
  message,
  setMessage,
  handleSendMessage,
  isStreaming,
  isLoading,
  isChatHistoryLoading,
  isSidebarOpen,
}: {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: () => Promise<void>;
  isStreaming: boolean;
  isLoading: boolean;
  isChatHistoryLoading: boolean;
  isSidebarOpen: boolean;
}) => {
  return (
    <div
      className={`flex gap-2 items-center justify-center self-center p-4  fixed bottom-0 ${
        isSidebarOpen ? " w-[calc(90%-256px)]" : "w-[calc(90%)]"
      } transition-all duration-300`}
    >
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
          }
        }}
        placeholder="Type your message..."
        className="w-full flex-1 p-2 bg-gray-900 rounded-lg resize-none h-12 text-white "
      />
      <button
        onClick={handleSendMessage}
        disabled={isStreaming || isChatHistoryLoading || isLoading}
        className="bg-blue-600 rounded-lg p-2 text-white hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed h-12 w-fit"
      >
        {isStreaming ? (
          <FallingLines color="black" width="20" height="20" />
        ) : (
          <SendIcon width={20} height={20} />
        )}
      </button>
    </div>
  );
};

export default ChatInput;
