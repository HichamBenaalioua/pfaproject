import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Budget from "./components/Budget";
import Transaction from "./components/Transaction";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/budget",
        element: <Budget></Budget>,
      },
      {
        path: "/transactions",
        element: <Transaction></Transaction>,
      },
      {
        path: "/",
        element: <Budget></Budget>,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
