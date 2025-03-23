import { createSlice } from "@reduxjs/toolkit";
import { User as PrismaUser } from "@prisma/client";

export interface User {
  isAuthenticated: boolean;
  user: PrismaUser;
}

export interface GlobalUser  {
  isAuthenticated: boolean,
  role : string,
  data:any
}

const userAuthSlice = createSlice({
  name: "userAuthSlice",
  initialState: {
    user: {} as PrismaUser,
    isAuthenticated: false,
  } as User,
  reducers: {
    setUserInfo: (state, action) => {
      state.user = action.payload;
    },
    setIsUserAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

const globalAuthSlice = createSlice({
  name: "globalAuthSlice",
  initialState: {
    globalUser: {} as GlobalUser, 
  },
  reducers: {
    setGlobalUserAuth: (state, action) => {
      state.globalUser = { ...state.globalUser, ...action.payload };
    },
  },
});

export const { setUserInfo, setIsUserAuthenticated } = userAuthSlice.actions;
export const { setGlobalUserAuth } = globalAuthSlice.actions;
export const userAuthSliceReducer = userAuthSlice.reducer;
export const globalUserAuthSlice = globalAuthSlice.reducer;
