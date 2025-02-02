import { configureStore } from "@reduxjs/toolkit";
import {authModalReducer, dropdownMenuModalReducer} from "../src/slice/Modal";
import authUserReducer from '../src/slice/Auth'

export const store = configureStore({
  reducer: {
    authModalReducer,
    dropdownMenuModalReducer,
    authUserReducer

  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

