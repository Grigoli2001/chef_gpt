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
  const handleStartChat = async () => {
    await startNewChat(chef_name, chatId)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error("Error starting chat:", error);
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
      <button onClick={handleStartChat}>Start Chat</button>
    </div>
  );
}
