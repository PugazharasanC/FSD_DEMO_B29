import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
      user: JSON.parse(localStorage.getItem("user") || null) || null,
  },
  reducers: {
    setState: (state, action) => {
      console.log(action);
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      state.user = action.payload.user;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    clearState: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

const authReducer = authSlice.reducer;
export const { setState, clearState } = authSlice.actions;
export default authReducer;
