import Navbar from "../components/layout/Navbar";
import LeftSidebar from "../components/layout/LeftSidebar";
import RightSidebar from "../components/layout/RightSidebar";
import CreatePost from "../components/post/CreatePost";
import PostCard from "../components/post/PostCard";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-100">

      <Navbar />

      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 mt-6 px-4">

        {/* Left */}

        <div className="col-span-3">
          <LeftSidebar />
        </div>

        {/* Center */}

        <div className="col-span-6 space-y-6">
          <CreatePost />
          <PostCard />
          <PostCard />
        </div>

        {/* Right */}

        <div className="col-span-3">
          <RightSidebar />
        </div>

      </div>

    </div>
  );
}