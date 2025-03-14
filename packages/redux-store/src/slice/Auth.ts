import { createSlice } from "@reduxjs/toolkit";
import { User as PrismaUser } from "@prisma/client";

export interface User {
  isAuthenticated: boolean;
  user: PrismaUser;
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
    globalUser: {} as any,    ///todo later edit it properly 
  },
  reducers: {
    setGlobalUserAuth: (state, action) => {
      state.globalUser = { ...state, ...action.payload };
    },
  },
});

export const { setUserInfo, setIsUserAuthenticated } = userAuthSlice.actions;
export const { setGlobalUserAuth } = globalAuthSlice.actions;
export const userAuthSliceReducer = userAuthSlice.reducer;
export const globalUserAuthSlice = globalAuthSlice.reducer;
