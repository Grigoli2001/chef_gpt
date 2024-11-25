import { useState } from "react";
import { startNewChat } from "../api/gpt";

export default function StartChat({
  chef_name,
  chatId,
  setChatId,
}: {
  chef_name: string;
  chatId: string;
  setChatId: (chatId: string) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const handleStartChat = async () => {
    setIsLoading(true);
    await startNewChat(chef_name, chatId)
      .then((res) => {
        console.log(res);
        setChatId(res.sessionId);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error starting chat:", error);
        setIsLoading(false);
      });
  };

  return (
    <div>
      <h1>Start Chat</h1>
      <input
        type="text"
        placeholder="Chat ID"
        value={chatId}
        onChange={(e) => setChatId(e.target.value)}
      />
      <button onClick={handleStartChat} disabled={isLoading}>
        {isLoading ? "Starting..." : "Start Chat"}
      </button>
    </div>
  );
}
