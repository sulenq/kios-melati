import { ChakraProvider } from "@chakra-ui/react";
// import { useState, useEffect } from "react";

import "./globalStyle.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { globalTheme } from "./globalTheme";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import Admin from "./pages/Admin";
import RequireRole from "./pages/RequireRole";
import Cashier from "./pages/Cashier";
import SearchProduct from "./pages/ProductSearch";
import Checkout from "./pages/Checkout";

export const App = () => {
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });

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
              <RequireRole
                allowedRoles={["admin", "cashier"]}
                signinPath={"/signin"}
              >
                <Cashier />
              </RequireRole>
            }
          />

          <Route
            path="/search-product"
            element={
              <RequireRole
                allowedRoles={["admin", "cashier"]}
                signinPath={"/signin"}
              >
                <SearchProduct />
              </RequireRole>
            }
          />

          <Route
            path="/checkout"
            element={
              <RequireRole allowedRoles={["cashier"]} signinPath={"/signin"}>
                <Checkout />
              </RequireRole>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};
