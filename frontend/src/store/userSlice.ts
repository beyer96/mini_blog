import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  username: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

const initialState: User | Record<never, never> = {};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (_, action: PayloadAction<User>) => {
      return action.payload;
    },
    logout: () => {
      return {}
    }
  }
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
