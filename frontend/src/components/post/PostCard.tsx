import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
} from "lucide-react";

export default function PostCard() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">

      {/* Header */}

      <div className="flex justify-between">

        <div className="flex gap-3">

          <img
            src="https://ui-avatars.com/api/?name=Rahul"
            className="w-12 h-12 rounded-full"
            alt="avatar"
          />

          <div>
            <h3 className="font-semibold">
              Rahul Sharma
            </h3>

            <p className="text-gray-500 text-sm">
              2 minutes ago
            </p>
          </div>

        </div>

        <MoreHorizontal className="cursor-pointer" />

      </div>

      {/* Content */}

      <p className="mt-4 leading-7">
        Finally completed my CampusConnect project 🚀🔥
      </p>

      <img
        src="https://picsum.photos/800/400"
        className="rounded-xl mt-4"
        alt="post"
      />

      {/* Actions */}

      <div className="flex justify-around mt-5 border-t pt-4">

        <button className="flex gap-2 hover:text-red-500">
          <Heart size={20} />
          Like
        </button>

        <button className="flex gap-2 hover:text-blue-600">
          <MessageCircle size={20} />
          Comment
        </button>

        <button className="flex gap-2 hover:text-green-600">
          <Share2 size={20} />
          Share
        </button>

      </div>

    </div>
  );
}