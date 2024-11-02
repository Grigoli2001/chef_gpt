import { useAuth } from "../context/UseAuth";
import StartChat from "../components/StartChat";
import { useState } from "react";
import useChatStream from "../hooks/useChatStream";

export default function ChatPage() {
  const [chatId, setChatId] = useState("");
  const [message, setMessage] = useState("");
  const { response, isStreaming, getChatResponse } = useChatStream(
    message,
    chatId
  );

  const handleSendMessage = () => {
    getChatResponse();
  };

  const { logout, user } = useAuth();
  return (
    <div>
      <h1>Chat Page</h1>
      <h2>Welcome, {user?.username}</h2>
      <StartChat
        chef_name="Gordon Ramsey"
        chatId={chatId}
        setChatId={setChatId}
      />

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={handleSendMessage} disabled={isStreaming}>
        {isStreaming ? "Sending..." : "Send Message"}
      </button>
      <div className="chat-response">
        <pre>{response}</pre>
      </div>

      <button onClick={logout}>Logout</button>
    </div>
  );
}
