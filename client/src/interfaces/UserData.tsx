export interface Post {
  id: number;
  content: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserData {
  id: number;
  username: string;
  email: string;
  aboutMe: string;
  profilePicture: string;
  posts: Post[];
}
