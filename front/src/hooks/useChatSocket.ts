import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const useChatSocket = (userId: string) => {
  const [response, setResponse] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const socket: Socket = io("http://localhost:8080");

    socket.emit("registerUser", userId);

    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("chatResponseStart", () => {
      setResponse("");
      setIsTyping(true);
    });

    socket.on("chatResponseChunk", (data: string) => {
      setResponse((prev) => prev + data);
    });

    socket.on("chatResponseEnd", (data: string) => {
      setResponse((prev) => prev + data);
      setIsTyping(false);
    });

    socket.on("chatResponseError", (error: { error: string }) => {
      setError(error.error);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  return { response, isConnected, isTyping, error };
};

export default useChatSocket;
