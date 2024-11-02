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

interface SelectLikesProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
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

export default function SelectLikes({
  setPage,
  userPreferences,
  setUserPreferences,
}: SelectLikesProps) {
  const [selected, setSelected] = useState<string[]>([
    ...userPreferences.likes,
  ]);

  const handleLike = (like: string) => {
    if (selected.includes(like)) {
      setSelected((prev) => prev.filter((item) => item !== like));
    } else {
      setSelected((prev) => [...prev, like]);
    }
  };

  const handleNext = () => {
    setUserPreferences((prev) => ({
      ...prev,
      likes: selected,
    }));
    setPage((prev) => prev + 1);
  };

  return (
    <div className="transition-all relative overflow-auto">
      <div className="grid grid-cols-3 gap-4 m-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleLike(category)}
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
          onClick={handleNext}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Done
        </button>
      </div>
    </div>
  );
}
