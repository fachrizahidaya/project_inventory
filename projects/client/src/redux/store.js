import { configureStore } from "@reduxjs/toolkit";
import admin from "./admin";

export default configureStore({
  reducer: {
    admin,
  },
});
