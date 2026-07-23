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
import {
  getNotifications,
  markNotificationRead,
} from "@/services/notificationService";

export default function Navbar() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  const handleNotificationClick = async (notification: any) => {
    try {
        if (!notification.isRead) {
            await markNotificationRead(notification.id);

            setNotifications((prev) =>
                prev.map((item) =>
                item.id === notification.id
                ? { ...item, isRead: true }
               : item
                )
           );
          }

    if (notification.postId) {
      navigate("/dashboard");
    }
  } catch (error) {
    console.error(error);
    }
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


  useEffect(() => {
  const fetchNotifications = async () => {
    try {
      const data = await getNotifications();
       setNotifications(data);
       } catch (error) {
         console.error(error);
       }
    };

     fetchNotifications();
   }, []);


   const unreadCount = notifications.filter(
     (notification) => !notification.isRead
      ).length;

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
                    {/* Notifications */}
<div className="relative">

  <Bell
    size={22}
    onClick={() => setShowNotifications(!showNotifications)}
    className="cursor-pointer hover:text-blue-600 transition"
  />

  {unreadCount > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
      {unreadCount}
    </span>
  )}

  {showNotifications && (
    <div className="absolute right-0 mt-4 w-80 bg-white rounded-xl shadow-xl border z-50 max-h-96 overflow-y-auto">

      <div className="p-4 border-b font-bold text-lg">
        Notifications
      </div>

      {notifications.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          No notifications
        </div>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification.id}
            onClick={() =>
              handleNotificationClick(notification)
            }
            className={`p-4 border-b cursor-pointer hover:bg-gray-100 transition ${
              !notification.isRead
                ? "bg-blue-50"
                : ""
            }`}
          >
            <div className="flex gap-3">

              <img
                src={
                  notification.sender?.avatar ||
                  `https://ui-avatars.com/api/?name=${
                    notification.sender?.name || "U"
                  }`
                }
                className="w-10 h-10 rounded-full"
                alt=""
              />

              <div>

                <p className="font-semibold">
                  {notification.sender?.name}
                </p>

                <p className="text-sm text-gray-600">
                  {notification.message}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  {new Date(
                    notification.createdAt
                  ).toLocaleString()}
                </p>

              </div>

            </div>
          </div>
        ))
      )}

    </div>
  )}

</div>

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