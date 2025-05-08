import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Post } from "../types";

interface State {
  posts: Post[];
  total?: number;
  limit?: number;
  page?: number;
}

const initialState: State = {
  posts: []
}

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (_, action: PayloadAction<State>) => {
      return { ...action.payload }
    }
  }
});

export const { setPosts } = postsSlice.actions;

export default postsSlice.reducer;
