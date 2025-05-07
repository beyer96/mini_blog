export interface User {
  id: number;
  username: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  slug: string;
  created_at: Date;
  updated_at: Date;
  published_at: Date;
}
