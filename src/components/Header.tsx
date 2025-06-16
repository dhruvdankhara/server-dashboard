import { type Component } from "solid-js";
import { AiOutlineLogout } from "solid-icons/ai";

interface HeaderProps {
  onLogout: () => void;
}

const Header: Component<HeaderProps> = (props) => {
  return (
    <div class="text-center mb-6 sm:mb-8 relative">
      <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-2">
        Server Dashboard
      </h1>
      {/* Logout Button */}
      <button
        onClick={props.onLogout}
        class="absolute top-0 right-0 p-2 text-gray-400 hover:text-white transition-colors"
        title="Logout"
      >
        <AiOutlineLogout class="w-5 h-5" />
      </button>
    </div>
  );
};

export default Header;
