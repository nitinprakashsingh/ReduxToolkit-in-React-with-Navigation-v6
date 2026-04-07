export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface PostsState {
  data: Post[];
  isLoading: boolean;
  error: string | null;
}