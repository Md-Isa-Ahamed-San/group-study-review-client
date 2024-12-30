import { FaRegClipboard } from "react-icons/fa";

const EmptyState = ({ message }) => {
  return (
    <div className="flex items-center justify-center text-center space-y-4 w-full h-screen">
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <FaRegClipboard className="w-16 h-16 text-gray-500" />
        <p className="text-gray-400 text-2xl">{message}</p>
      </div>
    </div>
  );
};

export default EmptyState;
