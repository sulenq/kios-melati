import { ChakraProvider } from "@chakra-ui/react";
// import { useState, useEffect } from "react";

import "./globalStyle.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { globalTheme } from "./globalTheme";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
// import { useScreenWidth } from "./utils";
import Admin from "./pages/Admin";
import RequireRole from "./pages/RequireRole";
import Cashier from "./pages/Cashier";

export const App = () => {
  // UTILS
  // const sw = useScreenWidth();

  // adjust vp scale for mobile
  // const [vp, setVp] = useState<HTMLMetaElement | null>(null);
  // useEffect(() => {
  //   setVp(document.querySelector<HTMLMetaElement>('meta[name="viewport"]'));
  // }, []);
  // useEffect(() => {
  //   if (vp) {
  //     if (sw < 770) {
  //       vp.setAttribute("content", "width=device-width, initial-scale=0.8125");
  //     } else {
  //       vp.setAttribute("content", "width=device-width, initial-scale=1");
  //     }
  //   }
  // }, [vp, sw]);

  return (
    <ChakraProvider theme={globalTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          {/* <Route path="/signup" element={<Landing />} /> */}

          <Route
            path="/admin"
            element={
              <RequireRole allowedRoles={["admin"]} signinPath={"/signin"}>
                <Admin />
              </RequireRole>
            }
          />

          <Route
            path="/cashier"
            element={
              <RequireRole allowedRoles={["cashier"]} signinPath={"/signin"}>
                <Cashier />
              </RequireRole>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};
