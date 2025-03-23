import { Outlet, useNavigate } from "react-router-dom";
import { ROLES } from "./constants";
import { ReactNode, useEffect } from "react";
import { RootState } from "@repo/redux-store/store";
import { useDispatch, useSelector } from "@repo/redux-store";
import { initSocket } from "@repo/redux-store/socket";

interface ProtectedRoutesProps {
  roles: ROLES[];
}

const ProtectedRoutes = ({ roles }: ProtectedRoutesProps): ReactNode => {
  const navigate = useNavigate();
  const { globalUser } = useSelector(
    (state: RootState) => state.globalUserAuthSlice
  );
  const dispatch = useDispatch()

  const isAuthenticated = globalUser?.isAuthenticated;
  const userRole = globalUser?.role as ROLES
  
useEffect(() => {
    if (!globalUser || Object.keys(globalUser).length === 0) return

    if (!isAuthenticated) {
      navigate("/", { replace: true })
    } else if (!roles.includes(userRole)) {
      navigate(userRole === "user" ? "/" : "/captain/home", { replace: true });
    }
    else if(isAuthenticated && roles.includes(userRole)){
      dispatch(initSocket({}))
      if (
        userRole === "captain" &&
        globalUser?.data?.captain &&
        globalUser?.data?.captain?.onboarding === "pending"
      ) {
        navigate("/captain/vehicle", { replace: true });
      }
      
    }
  }, [globalUser, isAuthenticated, userRole]);
  if (!globalUser || Object.keys(globalUser).length === 0) {
    return null
  }

  if (!isAuthenticated || !roles.includes(userRole)) {
    return null
  }


  return <Outlet />
};

export default ProtectedRoutes;
