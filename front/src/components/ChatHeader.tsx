import { ChatHistory } from "../types/api.types";

const ChatHeader = ({
  chatHistory,
  isLoading,
}: {
  chatHistory: ChatHistory | undefined;
  isLoading: boolean;
}) => {
  return (
    <>
      {!chatHistory ||
        isLoading ||
        (chatHistory?.messages.length === 0 && (
          <div
            className={`flex flex-col p-4 mt-10 bg-gray-700 rounded-lg shadow-lg max-w-[70%] min-w-[200px] mx-auto text-center`}
          >
            <h2 className="text-2xl font-bold mb-10">
              Welcome to <strong>Chef GPT!</strong>{" "}
            </h2>
            <p>
              Your personal culinary assistant is ready to help you explore
              recipes, answer cooking questions, and make your time in the
              kitchen delightful. Sit tight while we load the magic!
            </p>
          </div>
        ))}
    </>
  );
};

export default ChatHeader;
