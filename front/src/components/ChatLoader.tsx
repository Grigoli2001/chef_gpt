import { Hourglass } from "react-loader-spinner";

const ChatLoader = ({ loaderText }: { loaderText: string }) => (
  <div className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-75 z-50">
    <div className="text-center ">
      <div className="flex justify-center items-center">
        <Hourglass />
      </div>
      <h2 className="text-white mt-4 text-lg font-semibold">{loaderText}</h2>
      <p className="text-gray-300 mt-2">
        Chef GPT is sharpening the knives and firing up the stove for you!
      </p>
    </div>
  </div>
);

export default ChatLoader;
