import api from "../hooks/axios";
import { StartChatResponse, ChatHistory, UserChats } from "../types/api.types";
export const startNewChat = async (
  chef_name: string,
  chatId?: string
): Promise<StartChatResponse> => {
  console.log("Starting chat");
  const response = await api.post(
    `/gpt/chat`,
    {
      chef_name,
      chatId,
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
};

export const getChatResponse = async (message: string, chatId: string) => {
  const response = await api.post(`/gpt/chatResponse`, { message, chatId });

  return response.data;
};

export const getChatHistory = async (chatId: string): Promise<ChatHistory> => {
  const response = await api.get(`/gpt/chat/history/${chatId}`);
  return response.data.chatHistory;
};

export const getUserChats = async (): Promise<UserChats> => {
  const response = await api.get(`/gpt/chats`);
  return response.data;
};
