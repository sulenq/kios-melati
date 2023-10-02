import { getCookie, removeCookie } from "typescript-cookie";
import { useEffect, useState } from "react";
import FullPageSpinner from "../components/FullPageSpinner";
import { Navigate } from "react-router-dom";

type Role = "admin" | "cashier" | "";
type AllowedRoles = Role[];
type Props = {
  allowedRoles: AllowedRoles;
  children: any;
  signinPath: string;
};

// For production, use authenticate api from backend
export default function RequireRole({
  allowedRoles,
  children,
  signinPath,
}: Props) {
  const [page, setPage] = useState(<FullPageSpinner />);

  function signOut() {
    removeCookie("authState");
    removeCookie("token");
  }

  useEffect(() => {
    const authStateCookie = getCookie("authState");
    if (authStateCookie) {
      try {
        const authState = JSON.parse(authStateCookie);
        // console.log(authState);

        if (
          (authState.token && allowedRoles.includes(authState.role)) ||
          allowedRoles.length === 0
        ) {
          // console.log("authorized");
          setPage(<FullPageSpinner />);
          // setTimeout(() => {
          //   setPage(children);
          // }, 500);
          setPage(children);
        } else {
          // console.log("unauthorized");
          signOut();
          setPage(<Navigate to={signinPath} />);
        }
      } catch (error) {
        console.error("Error parsing authState:", error);
        signOut();
        setPage(<Navigate to={signinPath} />);
      }
    } else {
      console.log("signin to get authenticated");
      signOut();
      setPage(<Navigate to={signinPath} />);
    }
  }, [allowedRoles, children, signinPath]);

  return page;
}
