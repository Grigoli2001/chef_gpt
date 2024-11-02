import { useState } from "react";

const categories = Array.from(
  new Set([
    "American",
    "Chinese",
    "Indian",
    "Italian",
    "Chicken",
    "Beef",
    "Pork",
    "Seafood",
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
    "Dairy-Free",
    "Healthy",
    "Fast Food",
    "Mexican",
    "Japanese",
    "Thai",
    "Burritos",
    "Pizza",
    "Burgers",
    "Salads",
    "Sandwiches",
    "Sushi",
    "Steak",
    "Soup",
    "Pasta",
    "Rice",
    "Noodles",
    "Curry",
    "Stir Fry",
    "Grilled",
    "Fried",
    "Baked",
    "Roasted",
    "Spicy",
    "Sweet",
    "Sour",
    "Salty",
    "Savory",
    "Bitter",
  ])
);

interface SelectDislikesProps {
  handleSubmit: () => void;
  userPreferences: {
    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
    dairyFree: boolean;
    healthy: boolean;
    likes: string[];
    dislikes: string[];
  };
  setUserPreferences: React.Dispatch<
    React.SetStateAction<{
      vegetarian: boolean;
      vegan: boolean;
      glutenFree: boolean;
      dairyFree: boolean;
      healthy: boolean;
      likes: string[];
      dislikes: string[];
    }>
  >;
}

export default function SelectDislikes({
  handleSubmit,
  userPreferences,
  setUserPreferences,
}: SelectDislikesProps) {
  const [selected, setSelected] = useState<string[]>([
    ...userPreferences.dislikes,
  ]);

  const handleDislike = (category: string) => {
    if (selected.includes(category)) {
      setSelected((prev) => prev.filter((item) => item !== category));
    } else {
      setSelected((prev) => [...prev, category]);
    }
  };

  const handleDone = () => {
    setUserPreferences((prev) => ({
      ...prev,
      dislikes: selected,
    }));
    handleSubmit();
  };
  const filteredCategories = categories.filter(
    (category) => !userPreferences.likes.includes(category)
  );
  return (
    <div className="transition-all relative overflow-auto">
      <div className="grid grid-cols-3 gap-4 m-4">
        {filteredCategories.map((category) => (
          <button
            key={category}
            onClick={() => handleDislike(category)}
            className={`${
              selected.includes(category) ? "bg-blue-700" : "bg-gray-600"
            } opacity-90 text-white font-bold py-2 px-4 rounded h-24`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="w-full bg-black opacity-80 sticky bottom-0">
        <button
          onClick={handleDone}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Done
        </button>
      </div>
    </div>
  );
}
