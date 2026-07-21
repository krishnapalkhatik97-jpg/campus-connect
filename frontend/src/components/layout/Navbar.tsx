import {
  Bell,
  House,
  Search,
  User,
  LogOut,
  MessageCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchUsers } from "@/services/searchService";

export default function Navbar() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  useEffect(() => {
    const fetchUsers = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      try {
        const data = await searchUsers(query);
        setResults(data);
        setShowResults(true);
      } catch (error) {
        console.error(error);
      }
    };

    const timer = setTimeout(fetchUsers, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-6">

        {/* Logo */}
        <h1
          onClick={() => navigate("/dashboard")}
          className="text-3xl font-bold text-blue-600 tracking-tight cursor-pointer"
        >
          CampusConnect
        </h1>

        {/* Search Bar */}
        <div className="relative hidden md:block w-96">
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
            <Search size={18} className="text-gray-500" />

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search students..."
              className="bg-transparent outline-none ml-2 w-full"
            />
          </div>

          {showResults && results.length > 0 && (
            <div className="absolute w-full mt-2 bg-white rounded-xl shadow-lg border overflow-hidden z-50">
              {results.map((user) => (
                <div
                  key={user.id}
                  onClick={() => {
                    navigate(`/profile/${user.id}`);
                    setQuery("");
                    setResults([]);
                    setShowResults(false);
                  }}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer"
                >
                  <img
                    src={
                      user.avatar ||
                      `https://ui-avatars.com/api/?name=${user.name}`
                    }
                    className="w-10 h-10 rounded-full"
                    alt={user.name}
                  />

                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-gray-500">
                      {user.bio || "CampusConnect User"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-6">

          {/* Home */}
          <House
            size={22}
            onClick={() => navigate("/dashboard")}
            className="cursor-pointer hover:text-blue-600 transition"
          />

          {/* Notifications */}
          <Bell
            size={22}
            className="cursor-pointer hover:text-blue-600 transition"
          />

          {/* Chat */}
          <MessageCircle
            size={22}
            onClick={() => navigate("/chat")}
            className="cursor-pointer hover:text-blue-600 transition"
          />

          {/* Profile */}
          <User
            size={22}
            onClick={() => navigate(`/profile/${userId}`)}
            className="cursor-pointer hover:text-blue-600 transition"
          />

          {/* Logout */}
          <LogOut
            size={22}
            onClick={handleLogout}
            className="cursor-pointer hover:text-red-600 transition"
          />

          {/* Avatar */}
          <img
            src="https://ui-avatars.com/api/?name=KP&background=2563eb&color=fff"
            alt="Profile"
            onClick={() => navigate(`/profile/${userId}`)}
            className="w-10 h-10 rounded-full cursor-pointer hover:scale-105 transition"
          />
        </div>
      </div>
    </nav>
  );
}