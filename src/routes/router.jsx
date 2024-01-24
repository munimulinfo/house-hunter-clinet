import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ProtectRoute from "./ProtectRoute";
import Dashboard from "../components/dashboard";
import AllHouse from "../pages/HouseOwner/AllHouse";
import BookedHouse from "../pages/HouseOwner/BookedHouse";
import Home from "../pages/Home";
import BookHouse from "../pages/HouseRenter/BookHouse";
import { ErrorPage } from "../pages/ErrorPage";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "house-owner",
        element: (
          <ProtectRoute>
            <AllHouse></AllHouse>
          </ProtectRoute>
        ),
      },
      {
        path: "booked-house",
        element: (
          <ProtectRoute>
            <BookedHouse></BookedHouse>
          </ProtectRoute>
        ),
      },
      {
        path: "house-renter",
        element: (
          <ProtectRoute>
            <BookHouse></BookHouse>
          </ProtectRoute>
        ),
      },
    ],
  },
]);
