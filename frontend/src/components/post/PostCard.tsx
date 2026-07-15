import { useEffect, useState } from "react";
import {
  Heart,
  MessageCircle,
  MoreHorizontal,
  Share2,
} from "lucide-react";
import { toggleLike } from "../../services/likeService";
import {
  createComment,
  getComments,
} from "../../services/commentService";

interface PostCardProps {
  post: {
    id: string;
    content: string;
    image?: string | null;
    createdAt: string;

    _count: {
      likes: number;
      comments: number;
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
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<any[]>([]);
  const [commentCount, setCommentCount] = useState(post._count.comments);

  const handleLike = async () => {
    try {
      const data = await toggleLike(post.id);

      setLiked(data.liked);
      setLikes(data.likesCount);
    } catch (error) {
      console.error(error);
    }
  };
  const loadComments = async () => {
  try {
    const data = await getComments(post.id);
    setComments(data);
  } catch (error) {
    console.error(error);
  }
};

const handleComment = async () => {
  if (!comment.trim()) return;

  try {
    await createComment(post.id, comment);
    setComment("");
    loadComments();

    setCommentCount((prev) => prev + 1);
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  if (showComments) {
    loadComments();
  }
}, [showComments]);

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
      {showComments && (
  <div className="mt-4 border-t pt-4">
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="flex-1 border rounded-lg px-3 py-2"
      />

      <button
        onClick={handleComment}
        className="bg-blue-600 text-white px-4 rounded-lg"
      >
        Post
      </button>
    </div>

    <div className="mt-4 space-y-3">
      {comments.map((c) => (
        <div
          key={c.id}
          className="bg-gray-100 rounded-lg p-3"
        >
          <p className="font-semibold">{c.user.name}</p>
          <p>{c.content}</p>
        </div>
      ))}
    </div>
  </div>
)}

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

        <button
           onClick={() => setShowComments(!showComments)}
            className="flex gap-2 hover:text-blue-600"
>
                   <MessageCircle size={20} />
           {commentCount}
        </button>

        <button className="flex gap-2 hover:text-green-600">
          <Share2 size={20} />
          Share
        </button>

      </div>
    </div>
  );
}