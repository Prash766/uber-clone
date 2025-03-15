import { useEffect } from "react";
import { authorizeUserCheck } from "../api-client";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "@repo/redux-store";
import { RootState } from "@repo/redux-store/store";
import { setGlobalUserAuth } from "@repo/redux-store/auth";

export function useAuth() {
  const dispatch = useDispatch();
  const { globalUser } = useSelector(
    (state: RootState) => state.globalUserAuthSlice
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userAuthCheck"],
    queryFn: authorizeUserCheck,
    staleTime: 5 * 60 * 1000, 
  });

  useEffect(() => {
    if (data) {
      dispatch(setGlobalUserAuth(data));
    }
  }, [data, dispatch]);

  return {
    globalUser,
    isLoading,
    isError,
  };
}
