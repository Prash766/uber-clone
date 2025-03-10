import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserDetails, verifyUser } from "../api-client";
import { useDispatch, useSelector } from "@repo/redux-store";
import { RootState } from "@repo/redux-store/store";
import { Navigate, Outlet } from "react-router-dom";
import { setIsUserAuthenticated, setUserInfo } from "@repo/redux-store/auth";
import { useEffect, useState } from "react";

const PrivateRoutes = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(
    (state: RootState) => state.authUserReducer
  );
  const [isVerifying, setIsVerifying] = useState(true);

  const mutation = useMutation({
    mutationKey: ["userAuthCheck"],
    mutationFn: verifyUser,
    onSuccess: () => {
      dispatch(setIsUserAuthenticated(true));
      setIsVerifying(false);
    },
    onError: () => {
      dispatch(setIsUserAuthenticated(false));
      setIsVerifying(false);
    },
  });


  useEffect(() => {
    mutation.mutate();
  }, []);


  if (isVerifying || mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated && !isVerifying) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default PrivateRoutes;
