import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Spinner } from "@nextui-org/react";

import { DashboardPageLayout, PageLayout } from "./layouts/PageLayout";
import { login } from "./redux/auth/authSlice";
import store from "./redux/store";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/dashboard";
import ProductPage from "./pages/dashboard/ProductPage";
import CustomerPage from "./pages/dashboard/customers/CustomerPage";
import CustomerPage from "./pages/dashboard/CustomerPage";
import ProtectedRoute from "./components/ProtectedRoute";
import BillPage from "./pages/dashboard/BillPage";

export const App = () => {
  const setUser = () => {
    const token = localStorage.getItem("token");
    if (token) {
      store.dispatch(login(jwtDecode(token)));
    }
  };
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setUser();
		setLoading(false);
	}, []);

	const router = createBrowserRouter([
		{
			path: "",
			element: (
				<PageLayout>
					<HomePage />
				</PageLayout>
			),
		},
		{
			path: "login",
			element: <LoginPage />,
		},
		{
			path: "register",
			element: <RegisterPage />,
		},
		{
			path: "/",
			element: (
				<ProtectedRoute>
					<Outlet />
				</ProtectedRoute>
			),
			children: [
				{
					path: "dashboard",
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
						{
							path: "bill",
							element: <BillPage />,
						},
					],
				},
			],
		},
	]);

	if (loading) {
		return (
			<div className='flex items-center justify-center h-screen'>
				<Spinner size='lg' />
			</div>
		);
	}

  return <RouterProvider router={router} />;
};
