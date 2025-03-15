import { Outlet, useNavigate } from "react-router-dom";
import { ROLES } from "./constants";
import { ReactNode, useEffect } from "react";
import { RootState } from "@repo/redux-store/store";
import { useSelector } from "@repo/redux-store";
import { replace } from "lodash";

interface ProtectedRoutesProps {
  roles: ROLES[];
}

const ProtectedRoutes = ({ roles }: ProtectedRoutesProps): ReactNode => {
  const navigate = useNavigate();
  const { globalUser } = useSelector(
    (state: RootState) => state.globalUserAuthSlice
  );

  const isAuthenticated = globalUser?.isAuthenticated;
  const userRole = globalUser?.role;

  useEffect(() => {
    if (!globalUser || Object.keys(globalUser).length === 0) return

    if (!isAuthenticated) {
      console.log("hi tehre")
      navigate("/", { replace: true })
    } else if (!roles.includes(userRole)) {
      navigate(userRole === "user" ? "/" : "/captain/home", { replace: true });
    }
  }, [globalUser, isAuthenticated, userRole]);

  // if (!globalUser || Object.keys(globalUser).length === 0) {
  //   return null
  // }

  // if (!isAuthenticated || !roles.includes(userRole)) {
  //   return null
  // }

  return <Outlet />
};

export default ProtectedRoutes;
