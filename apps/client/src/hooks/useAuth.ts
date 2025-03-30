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

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["userAuthCheck"],
    queryFn: authorizeUserCheck,
  });

  useEffect(() => {
    console.log("runnig useAuth")
    console.log("data",data)
    if (isSuccess) {
      console.log("useAuth data",data)
      dispatch(setGlobalUserAuth(data));
    }
  }, [data, dispatch , isSuccess]);

  return {
    globalUser,
    isLoading,
    isError,
  };
}
