import api from "../hooks/axios";

export const startNewChat = async (
  chef_name: string,
  chatId?: string
): Promise<Response> => {
  console.log("Starting chat with", chef_name, chatId);
  console.log(api.defaults.headers);
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
