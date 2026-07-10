import {
  House,
  User,
  Users,
  Bookmark,
  Calendar,
} from "lucide-react";

export default function LeftSidebar() {
  return (
    <aside className="bg-white rounded-2xl shadow-sm p-6">

      <div className="flex flex-col items-center">

        <img
          src="https://ui-avatars.com/api/?name=Krishna"
          className="w-20 h-20 rounded-full"
        />

        <h2 className="font-bold text-xl mt-4">
          Krishna
        </h2>

        <p className="text-gray-500">
          Mechanical Engineering
        </p>

      </div>

      <hr className="my-6" />

      <div className="space-y-5">

        <div className="flex items-center gap-3 cursor-pointer hover:text-blue-600">
          <House size={20} />
          Home
        </div>

        <div className="flex items-center gap-3 cursor-pointer hover:text-blue-600">
          <User size={20} />
          Profile
        </div>

        <div className="flex items-center gap-3 cursor-pointer hover:text-blue-600">
          <Users size={20} />
          Friends
        </div>

        <div className="flex items-center gap-3 cursor-pointer hover:text-blue-600">
          <Bookmark size={20} />
          Saved
        </div>

        <div className="flex items-center gap-3 cursor-pointer hover:text-blue-600">
          <Calendar size={20} />
          Events
        </div>

      </div>

    </aside>
  );
}