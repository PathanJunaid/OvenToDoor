import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StoreContextProvider from "./context/StoreContext.jsx";
import AdminStoreContextProvider from "./context/AdminStoreContextProvider.jsx";
import AdminRoutes from "./AdminRoutes.jsx";
import Admin from "./AdminPages/AdminLogin.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StoreContextProvider>
    <AdminStoreContextProvider>
      {/* <StrictMode> */}
        <BrowserRouter>
          <Routes>
            <Route
              path="/admin/*"
              element={
                <AdminRoutes />
              }
            />
            <Route
              path="/*"
              element={
                <App />
              }
            />
          </Routes>
        </BrowserRouter>

      {/* </StrictMode> */}
    </AdminStoreContextProvider >
  </StoreContextProvider >
);
