import { configureStore } from "@reduxjs/toolkit";
import {authModalReducer, dropdownMenuModalReducer } from "../src/slice/Modal";
import  {userAuthSliceReducer, globalUserAuthSlice } from '../src/slice/Auth'
import userLocationReducer from '../src/slice/Location'
import {captainRegistrationReducer , captainDetailsReducer} from '../src/slice/Captain'
import {placeListReducer, rideLocationReducer} from '../src/slice/Ride'

export const store = configureStore({
  reducer: {
    authModalReducer,
    globalUserAuthSlice,
    dropdownMenuModalReducer,
    userAuthSliceReducer,
    userLocationReducer,
    placeListReducer,
    rideLocationReducer,
    captainRegistrationReducer,
    captainDetailsReducer
  
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
