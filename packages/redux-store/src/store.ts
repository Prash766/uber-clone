import { configureStore } from "@reduxjs/toolkit";
import {authModalReducer, dropdownMenuModalReducer} from "../src/slice/Modal";

export const store = configureStore({
  reducer: {
    authModalReducer,
    dropdownMenuModalReducer

  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

