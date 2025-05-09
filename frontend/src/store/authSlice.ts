import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../types/index.js";

interface AuthState {
  user: User | null;
  token: string | null | undefined
}

const initialState: AuthState = {
  user: null,
  token: undefined
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ user: User, token: string }>) {
      return { ...state, user: action.payload.user, token: action.payload.token };
    },
    logout(state) {
      return { ...state, user: null, token: null };
    }
  }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
