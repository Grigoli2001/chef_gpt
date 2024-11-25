import { useState, useRef, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAnimation } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/UseAuth";
import { getChatResponse, getChatHistory } from "../api/gpt";
import useChatSocket from "../hooks/useChatSocket";
import { useSearchParams } from "react-router-dom";
import { startNewChat } from "../api/gpt";
import { useSidebar } from "../context/UseSidebar";
import { chefImages } from "../constants/data";
import ChatInput from "../components/ChatInput";
import ChatMessages from "../components/ChatMessages";
import ChatHeader from "../components/ChatHeader";

export default function ChatPage() {
  const [searchParams] = useSearchParams();
  const { state } = useLocation();
  const chefName = state?.chef || searchParams.get("chef");
  const [chatId, setChatId] = useState(
    state?.chatId || searchParams.get("id") || ""
  );
  const [message, setMessage] = useState("");

  // const [response, setResponse] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { isSidebarOpen } = useSidebar();
  const controls = useAnimation();

  // refs
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const chefImageRef = useRef<string>("");
  const initialized = useRef(false);
  const { response: socketResponse, isTyping } = useChatSocket(
    user?._id as string
  );
  const { data: chatHistory, isLoading: isChatHistoryLoading } = useQuery({
    queryKey: ["chatHistory", chatId],
    queryFn: () => getChatHistory(chatId as string),
    enabled: !!chatId,
    refetchOnWindowFocus: false,
    // refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const scrollChatToBottom = () => {
    chatBoxRef.current?.scrollTo({
      top: chatBoxRef.current.scrollHeight,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    if (chefName) {
      const chefImage = getChefImage(chefName);
      chefImageRef.current = chefImage;
    }
    const initializeChat = async () => {
      console.log("initializing chat");
      try {
        setIsLoading(true);
        const response = await startNewChat(chefName as string, chatId);
        setChatId(response.sessionId);
        console.log(response);
      } catch (error) {
        console.error("Error starting new chat:", error);
      } finally {
        setIsLoading(false);
      }
    };
    initializeChat();
  }, [chefName, chatId]);

  const getChefImage = (chefName: string) => {
    const chefId = chefName.replace(" ", "_").toLowerCase().trim();
    return chefImages[chefId as keyof typeof chefImages];
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    setMessage("");
    setIsStreaming(true);
    scrollChatToBottom();

    queryClient.setQueryData(
      ["chatHistory", chatId],
      (oldData: {
        messages: { role: string; content: string; timestamp: string }[];
      }) => ({
        ...oldData,
        messages: [
          ...(oldData?.messages || []),
          {
            role: "user",
            content: message,
            timestamp: new Date().toISOString(),
          },
          {
            role: "assistant",
            content: "",
            timestamp: new Date().toISOString(),
          },
        ],
      })
    );

    try {
      await getChatResponse(message, chatId as string);
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setMessage("");
      setIsStreaming(false);
      scrollChatToBottom();
    }
    controls.start({
      opacity: 1,
      transition: { duration: 0.8 },
    });
  };

  useEffect(() => {
    if (isTyping) {
      setMessage("");
      queryClient.setQueryData(
        ["chatHistory", chatId],
        (oldData: {
          messages: { role: string; content: string; timestamp: string }[];
        }) => {
          const updatedMessages = [...(oldData?.messages || [])];
          const lastMessage = updatedMessages[updatedMessages.length - 1];

          if (lastMessage && lastMessage.role === "assistant") {
            lastMessage.content = socketResponse;
          }

          return {
            ...oldData,
            messages: updatedMessages,
          };
        }
      );
      controls.start({
        opacity: 1,
        transition: { duration: 0.8 },
      });
    } else {
      queryClient.invalidateQueries({ queryKey: ["chatHistory", chatId] });
    }
  }, [isTyping, socketResponse, chatId, queryClient, controls]);

  return (
    <div className="flex flex-col max-h-[calc(100vh-64px)] justify-between overflow-y-auto">
      <ChatHeader chatHistory={chatHistory} isLoading={isLoading} />

      <ChatMessages
        chatBoxRef={chatBoxRef}
        chefImageRef={chefImageRef}
        chatHistory={chatHistory}
        controls={controls}
        isChatHistoryLoading={isChatHistoryLoading}
        isLoading={isLoading}
      />

      <ChatInput
        message={message}
        setMessage={setMessage}
        handleSendMessage={handleSendMessage}
        isStreaming={isStreaming}
        isLoading={isLoading}
        isChatHistoryLoading={isChatHistoryLoading}
        isSidebarOpen={isSidebarOpen}
      />
    </div>
  );
}
