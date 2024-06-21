import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    id: 0,
    email: "",
    password: "",
    isSuper: 0,
  },
};

const admin = createSlice({
  name: "admin",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.id = action.payload.id;
      state.value.email = action.payload.email;
      state.value.password = action.payload.password;
      state.value.isSuper = action.payload.isSuper;
    },
    logout: (state, action) => {
      state.value.email = "";
      state.value.isSuper = 0;
    },
  },
});

export const { login, logout } = admin.actions;
export default admin.reducer;
