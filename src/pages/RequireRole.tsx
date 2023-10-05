import { getCookie, removeCookie } from "typescript-cookie";
import { useCallback, useEffect, useState } from "react";
import FullPageSpinner from "../components/FullPageSpinner";
import { Navigate } from "react-router-dom";
import useRequireRole from "../globalState/useRequireRole";
import { AuthState } from "./SignIn";

type Role = "admin" | "cashier" | "";
type AllowedRoles = Role[];
type Props = {
  allowedRoles: AllowedRoles;
  children: any;
  signinPath: string;
};

export default function RequireRole({
  allowedRoles,
  children,
  signinPath,
}: Props) {
  const { isVerified, setIsVerified } = useRequireRole();
  const [page, setPage] = useState(<FullPageSpinner />);
  const [authState, setAuthState] = useState<AuthState>();

  const signOut = () => {
    removeCookie("authState");
    removeCookie("token");
  };

  const tokenCheck = useCallback(() => {
    const authStateCookie = getCookie("authState");
    if (authStateCookie) {
      try {
        const authState = JSON.parse(authStateCookie);
        setAuthState(authState);
      } catch (error) {
        console.error("Error parsing authState:", error);
        signOut();
        setPage(<Navigate to={signinPath} />);
      }
    } else {
      signOut();
      setPage(<Navigate to={signinPath} />);
    }
  }, [signinPath]);

  useEffect(() => {
    if (authState) {
      if (!isVerified) {
        if (
          (authState.token && allowedRoles.includes(authState.role)) ||
          allowedRoles.length === 0
        ) {
          // simulasi loading aza aowkawok
          setTimeout(() => {
            setIsVerified(true);
          }, 500);
        } else {
          signOut();
          setPage(<Navigate to={signinPath} />);
        }
      } else {
        setPage(children);
      }
    } else {
      tokenCheck();
    }
  }, [
    authState,
    isVerified,
    allowedRoles,
    children,
    signinPath,
    setIsVerified,
    tokenCheck,
  ]);

  return page;
}

// export default function RequireRole({
//   allowedRoles,
//   children,
//   signinPath,
// }: Props) {
//   const { isVerified, setIsVerified } = useRequireRole();
//   const [page, setPage] = useState(<FullPageSpinner />);
//   const [authState, setAuthState] = useState<AuthState>();

//   const signOut = () => {
//     removeCookie("authState");
//     removeCookie("token");
//   };

//   const tokenCheck = () => {
//     const authStateCookie = getCookie("authState");
//     if (authStateCookie) {
//       try {
//         const authState = JSON.parse(authStateCookie);
//         setAuthState(authState);
//       } catch (error) {
//         console.error("Error parsing authState:", error);
//         signOut();
//         setPage(<Navigate to={signinPath} />);
//       }
//     } else {
//       signOut();
//       setPage(<Navigate to={signinPath} />);
//     }
//   };

//   if (authState) {
//     if (!isVerified) {
//       //TODO real case -> GET verified token to server, header token : Bearer {token}

//       if (
//         (authState.token && allowedRoles.includes(authState.role)) ||
//         allowedRoles.length === 0
//       ) {
//         // console.log("authorized");
//         // simulasi loading azaa aowkaowk (start)
//         setTimeout(() => {
//           setIsVerified(true);
//         }, 1000);
//         // simulasi loading azaa aowkaowk (end)
//       } else {
//         // console.log("unauthorized");
//         signOut();
//         setPage(<Navigate to={signinPath} />);
//       }
//     } else {
//       setPage(children);
//     }
//   } else {
//     tokenCheck();
//   }

//   useEffect(() => {
//     if (isVerified) {
//       setPage(<FullPageSpinner />);
//       setPage(children);
//     }
//   }, [isVerified, setPage, children]);

//   return page;
// }
