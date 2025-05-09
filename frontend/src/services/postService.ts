import { Post } from "../types";
import { axiosInstance } from "./axiosInstance";

interface GetPostsParams {
  limit?: number;
  page?: number;
}

export interface GetPostsResponse {
  posts: Post[];
  total: number;
  limit: number;
  page: number;
}

export default class PostService {
  static getPosts = async (params?: GetPostsParams): Promise<GetPostsResponse> => {
    const response = await axiosInstance.get("/posts", { params });

    return response.data;
  }

  static getPost = async (slug: string): Promise<{ post: Post }> => {
    const response = await axiosInstance.get(`/posts/${slug}`);

    return response.data;
  }
}
