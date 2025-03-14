import { createContext, useContext, ReactNode } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { authorizeUserCheck, getUserDetails } from '../api-client';
import { useDispatch, useSelector } from '@repo/redux-store';
import { RootState } from '@repo/redux-store/store';
import { setGlobalUserAuth } from '@repo/redux-store/auth';

interface AuthContextType {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: any;
  error: Error | null;
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
    enabled: !globalUser?.isAuthenticated,
  });

  const value = {
    isLoading,
    isAuthenticated: globalUser?.isAuthenticated || false,
    user: globalUser?.data,
    error
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