import { configureStore } from "@reduxjs/toolkit";
import {authModalReducer, dropdownMenuModalReducer } from "../src/slice/Modal";
import authUserReducer from '../src/slice/Auth'
import userLocationReducer from '../src/slice/Location'
import {placeListReducer, rideLocationReducer} from '../src/slice/Ride'

export const store = configureStore({
  reducer: {
    authModalReducer,
    dropdownMenuModalReducer,
    authUserReducer,
    userLocationReducer,
    placeListReducer,
    rideLocationReducer
  
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

