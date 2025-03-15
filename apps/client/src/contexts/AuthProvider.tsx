import { createContext, useContext, ReactNode } from 'react';
import { useMutation } from '@tanstack/react-query';
import {  getUserDetails } from '../api-client';
import { useDispatch, useSelector } from '@repo/redux-store';
import { RootState } from '@repo/redux-store/store';
import { setGlobalUserAuth } from '@repo/redux-store/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  error: any
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();
  const { globalUser } = useSelector((state: RootState) => state.globalUserAuthSlice);

  const mutate = useMutation({
    mutationKey: ['auth'],
    mutationFn: ()=>getUserDetails(),
    onSuccess: (data) => {
      if (data) {
        dispatch(setGlobalUserAuth({
          isAuthenticated: true,
          data,
          role: data.role
        }));
      }
    },
    retry: false,
  });

  const value = {
    isAuthenticated: globalUser?.isAuthenticated || false,
    user: globalUser?.data,
    error : mutate.isError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};