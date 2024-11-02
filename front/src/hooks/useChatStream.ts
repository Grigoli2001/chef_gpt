import { useState } from "react";
import api from "./axios";

const useChatStream = (message: string, chatId: string) => {
  const [response, setResponse] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  const getChatResponse = async () => {
    setIsStreaming(true);
    setResponse("");

    try {
      const res = await api.post(
        "/gpt/chatResponse",
        { message, chatId },
        {
          responseType: "stream",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const reader = res.data.getReader();
      const decoder = new TextDecoder("utf-8");

      let done = false;
      while (!done) {
        const { value, done: streamDone } = await reader.read();
        done = streamDone;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          setResponse((prev) => prev + chunk);
        }
      }
    } catch (error) {
      console.error("Error receiving chat response:", error);
    } finally {
      setIsStreaming(false);
    }
  };

  return { response, isStreaming, getChatResponse };
};

export default useChatStream;
