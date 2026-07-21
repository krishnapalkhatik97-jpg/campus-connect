export interface Post {
  id: string;
  content: string;
  image?: string | null;

  _count: {
    likes: number;
    comments: number;
  };
}

export interface Profile {
  id: string;
  name: string;
  bio?: string | null;
  avatar?: string | null;

  followers: number;
  following: number;

  isFollowing: boolean;

  posts: Post[];
}