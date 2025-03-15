import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import {authModalReducer, dropdownMenuModalReducer } from "../src/slice/Modal";
import  {userAuthSliceReducer, globalUserAuthSlice } from '../src/slice/Auth'
import userLocationReducer from '../src/slice/Location'
import {captainRegistrationReducer , captainDetailsReducer} from '../src/slice/Captain'
import {placeListReducer, rideLocationReducer} from '../src/slice/Ride'
import {socketReducer}  from './slice/Socket'
import socketMiddleware from './middleware/socketMiddleware'

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
    captainDetailsReducer,
    socketReducer
  
  },
middleware(getDefaultMiddleware) {
  return getDefaultMiddleware({
    serializableCheck: false,
  }).concat(socketMiddleware)
},
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
