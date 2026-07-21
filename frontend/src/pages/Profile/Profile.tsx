import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProfile } from "@/services/profileService";
import { toggleFollow } from "@/services/followService";

import type { Profile as ProfileType } from "@/types/profile";

export default function Profile() {
  const { id } = useParams();

  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!id) return;

      try {
        const data = await getProfile(id);

        setProfile(data);
        setIsFollowing(data.isFollowing);
      } catch (error) {
        console.error("Failed to fetch profile", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  const handleFollow = async () => {
    if (!profile) return;

    try {
      const data = await toggleFollow(profile.id);

      setIsFollowing(data.following);

      setProfile({
        ...profile,
        followers: data.following
          ? profile.followers + 1
          : profile.followers - 1,
      });
    } catch (error) {
      console.error("Follow Error:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl">
        Loading Profile...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl">
        User not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-5xl mx-auto p-6">

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow p-8">

          <div className="flex gap-6 items-center">

            <img
              src={
                profile.avatar ||
                `https://ui-avatars.com/api/?name=${profile.name}`
              }
              alt={profile.name}
              className="w-28 h-28 rounded-full"
            />

            <div className="flex-1">

              <h1 className="text-3xl font-bold">
                {profile.name}
              </h1>

              <p className="text-gray-500 mt-2">
                {profile.bio || "No bio yet..."}
              </p>

              <div className="flex gap-10 mt-6">

                <div>
                  <p className="font-bold text-2xl">
                    {profile.posts.length}
                  </p>
                  <p>Posts</p>
                </div>

                <div>
                  <p className="font-bold text-2xl">
                    {profile.followers}
                  </p>
                  <p>Followers</p>
                </div>

                <div>
                  <p className="font-bold text-2xl">
                    {profile.following}
                  </p>
                  <p>Following</p>
                </div>

              </div>

              <button
                onClick={handleFollow}
                className={`mt-6 px-6 py-2 rounded-lg text-white font-semibold transition ${
                  isFollowing
                    ? "bg-gray-700 hover:bg-gray-800"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isFollowing ? "Following" : "Follow"}
              </button>

            </div>

          </div>

        </div>

        {/* Posts */}
        <h2 className="text-2xl font-bold mt-10 mb-5">
          Posts
        </h2>

        <div className="space-y-5">

          {profile.posts.length === 0 ? (
            <div className="bg-white rounded-xl p-6 shadow">
              No posts yet.
            </div>
          ) : (
            profile.posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl shadow p-6"
              >
                <p className="text-lg">{post.content}</p>

                {post.image && (
                  <img
                    src={post.image}
                    alt="Post"
                    className="mt-4 rounded-xl"
                  />
                )}

                <div className="flex gap-6 mt-4 text-gray-500 text-sm">
                  <span>❤️ {post._count.likes}</span>
                  <span>💬 {post._count.comments}</span>
                </div>
              </div>
            ))
          )}

        </div>

      </div>
    </div>
  );
}