import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import { DashboardPageLayout, PageLayout } from "./layouts/PageLayout";
import { login } from "./redux/auth/authSlice";
import store from "./redux/store";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/dashboard";
import ProductPage from "./pages/dashboard/ProductPage";
import CustomerPage from "./pages/dashboard/CustomerPage";

export const App = () => {
  const setUser = () => {
    const token = localStorage.getItem("token");
    if (token) {
      store.dispatch(login(jwtDecode(token)));
    }
  };

  useEffect(() => {
    setUser();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <PageLayout>
          <HomePage />
        </PageLayout>
      ),
    },
    {
      path: "/auth",
      children: [
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "register",
          element: <RegisterPage />,
        },
      ],
    },
    {
      path: "/dashboard",
      element: <DashboardPageLayout />,
      children: [
        {
          path: "",
          element: <DashboardPage />,
        },
        {
          path: "product",
          element: <ProductPage />,
        },
        {
          path: "customer",
          element: <CustomerPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
