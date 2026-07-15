import { useState } from "react";
import { Image, Send } from "lucide-react";
import { createPost } from "../../services/postService";

interface CreatePostProps {
  onPostCreated: () => void;
}

export default function CreatePost({
  onPostCreated,
}: CreatePostProps) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    if (!content.trim()) {
      alert("Please write something!");
      return;
    }

    try {
      setLoading(true);

      await createPost(content);

      setContent("");

      onPostCreated();

      alert("✅ Post created successfully!");
    } catch (error) {
      console.error(error);
      alert("❌ Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">
      <div className="flex gap-4">
        <img
          src="https://ui-avatars.com/api/?name=KP"
          className="w-12 h-12 rounded-full"
          alt="avatar"
        />

        <textarea
          placeholder="What's happening on campus?"
          className="flex-1 resize-none border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className="flex justify-between items-center mt-4">
        <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
          <Image size={20} />
          Photo
        </button>

        <button
          onClick={handlePost}
          disabled={loading}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl disabled:opacity-50"
        >
          <Send size={18} />
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
}