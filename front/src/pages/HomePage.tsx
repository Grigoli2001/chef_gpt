import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import { startNewChat } from "../api/gpt";
import { chefs } from "../constants/data";

const HomePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const handleChefClick = async (chefName: string) => {
    setIsLoading(true);
    console.log(chefName);
    try {
      // const response = await startNewChat(chefName);
      navigate(`/chat?chef=${chefName}`);
    } catch (error) {
      console.error("Error starting chat:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col max-h-[calc(100vh-64px)] h-full bg-gray-700">
      {/* Main Content */}

      <div className="grid md:grid-cols-3 md:gap-4 w-full sm:grid-cols-2 sm:gap-2 overflow-y-auto">
        {chefs.map((chef) => (
          <div
            key={chef.id}
            className="p-4 bg-gray-600 hover:bg-gray-500 shadow rounded hover:shadow-md transition cursor-pointer mb-4 md:mb-0"
            onClick={() => handleChefClick(chef.name)}
          >
            <img
              src={chef.image}
              alt={chef.name}
              className="w-full h-32 object-contain object-center rounded mb-2"
            />
            <h3 className="text-lg font-semibold">{chef.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
