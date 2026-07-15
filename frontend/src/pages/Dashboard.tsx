import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import LeftSidebar from "../components/layout/LeftSidebar";
import RightSidebar from "../components/layout/RightSidebar";
import CreatePost from "../components/post/CreatePost";
import PostCard from "../components/post/PostCard";
import { getPosts } from "../services/postService";

interface Post {
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
}
export default function Dashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 mt-6 px-4">

        {/* Left Sidebar */}
        <div className="col-span-3">
          <LeftSidebar />
        </div>

        {/* Feed */}
        <div className="col-span-6 space-y-6">
          <CreatePost onPostCreated={fetchPosts} />

          {loading ? (
            <p className="text-center">Loading posts...</p>
          ) : posts.length === 0 ? (
            <p className="text-center text-gray-500">
              No posts yet.
            </p>
          ) : (
            posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          )}
        </div>

        {/* Right Sidebar */}
        <div className="col-span-3">
          <RightSidebar />
        </div>

      </div>
    </div>
  );
}