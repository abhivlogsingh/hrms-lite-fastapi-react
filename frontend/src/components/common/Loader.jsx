import { FaSpinner } from "react-icons/fa";

export default function Loader({ text = "Loading..." }) {
  return (
    <div className="flex items-center justify-center gap-2 py-6 text-gray-600">
      <FaSpinner className="animate-spin" />
      <span className="text-sm">{text}</span>
    </div>
  );
}
