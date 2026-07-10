import {
  Bell,
  House,
  Search,
  User,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-6">

        {/* Logo */}
        <h1 className="text-3xl font-bold text-blue-600 tracking-tight cursor-pointer">
          CampusConnect
        </h1>

        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-96">
          <Search size={18} className="text-gray-500" />

          <input
            type="text"
            placeholder="Search students..."
            className="bg-transparent outline-none ml-2 w-full"
          />
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-6">

          <House
            size={22}
            className="cursor-pointer hover:text-blue-600 transition"
          />

          <Bell
            size={22}
            className="cursor-pointer hover:text-blue-600 transition"
          />

          <User
            size={22}
            className="cursor-pointer hover:text-blue-600 transition"
          />

          <LogOut
            size={22}
            onClick={handleLogout}
            className="cursor-pointer hover:text-red-600 transition"
          />

          <img
            src="https://ui-avatars.com/api/?name=KP&background=2563eb&color=fff"
            alt="Profile"
            className="w-10 h-10 rounded-full cursor-pointer"
          />

        </div>

      </div>
    </nav>
  );
}