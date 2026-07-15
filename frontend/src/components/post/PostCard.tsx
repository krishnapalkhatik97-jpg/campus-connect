import {
  Heart,
  MessageCircle,
  MoreHorizontal,
  Share2,
} from "lucide-react";
import { useState } from "react";
import { toggleLike } from "../../services/likeService";

interface PostCardProps {
  post: {
    id: string;
    content: string;
    image?: string | null;
    createdAt: string;

    _count: {
      likes: number;
    };

    author: {
      name: string;
      avatar?: string | null;
    };
  };
}

export default function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post._count.likes);

  const handleLike = async () => {
    try {
      const data = await toggleLike(post.id);

      setLiked(data.liked);
      setLikes(data.likesCount);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">
      {/* Header */}
      <div className="flex justify-between">
        <div className="flex gap-3">
          <img
            src={
              post.author.avatar ||
              `https://ui-avatars.com/api/?name=${post.author.name}`
            }
            className="w-12 h-12 rounded-full"
            alt="avatar"
          />

          <div>
            <h3 className="font-semibold">{post.author.name}</h3>

            <p className="text-gray-500 text-sm">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        <MoreHorizontal className="cursor-pointer" />
      </div>

      {/* Content */}

      <p className="mt-4 leading-7">{post.content}</p>

      {post.image && (
        <img
          src={post.image}
          className="rounded-xl mt-4"
          alt="post"
        />
      )}

      {/* Actions */}

      <div className="flex justify-around mt-5 border-t pt-4">

        <button
          onClick={handleLike}
          className={`flex gap-2 ${
            liked ? "text-red-500" : "hover:text-red-500"
          }`}
        >
          <Heart
            size={20}
            fill={liked ? "currentColor" : "none"}
          />
          {likes}
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