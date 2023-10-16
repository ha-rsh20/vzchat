import { configureStore } from "@reduxjs/toolkit";
import { userSliceReducer } from "./slice/userSlice.js";

export const store = configureStore({
  reducer: {
    users: userSliceReducer,
  },
});
