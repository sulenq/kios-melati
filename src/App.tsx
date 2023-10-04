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
import ProductSearch from "./pages/ProductSearch";
import Checkout from "./pages/Checkout";
import RequireOrder from "./pages/RequireOrder";
import CashierTransaction from "./pages/CashierTransaction";
import CashierProfile from "./pages/CashierProfile";

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
              <RequireRole allowedRoles={["cashier"]} signinPath={"/signin"}>
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
                <ProductSearch />
              </RequireRole>
            }
          />

          <Route
            path="/checkout"
            element={
              <RequireRole allowedRoles={["cashier"]} signinPath={"/signin"}>
                <RequireOrder>
                  <Checkout />
                </RequireOrder>
              </RequireRole>
            }
          />

          <Route
            path="/cashier/transaction"
            element={
              <RequireRole allowedRoles={["cashier"]} signinPath={"/signin"}>
                <CashierTransaction />
              </RequireRole>
            }
          />

          <Route
            path="/cashier/profile"
            element={
              <RequireRole allowedRoles={["cashier"]} signinPath={"/signin"}>
                <CashierProfile />
              </RequireRole>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};
