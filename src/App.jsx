import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PageLayout } from "./layouts/PageLayout";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import Customers from "./pages/customers/Customers";

export const App = () => {
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
      ],
    },
    {
      path: "/customers",
      element: <Customers />,
    },
  ]);

  return <RouterProvider router={router} />;
};
