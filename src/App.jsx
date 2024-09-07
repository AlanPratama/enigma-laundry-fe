import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import { Spinner } from "@nextui-org/react";
import ProtectedRoute from "./components/ProtectedRoute";
import { DashboardPageLayout } from "./layouts/PageLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/dashboard";
import ProductPage from "./pages/dashboard/ProductPage";
import CustomerPage from "./pages/dashboard/customers/CustomerPage";
import BillPage from "./pages/dashboard/transaction/TransactionPage";
import { login } from "./redux/auth/authSlice";
import store from "./redux/store";

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
					path: "",
					element: <DashboardPageLayout />,
					children: [
						{
							path: "",
							element: <DashboardPage />,
						},
						{
							path: "products",
							element: <ProductPage />,
						},
						{
							path: "customers",
							element: <CustomerPage />,
						},
						{
							path: "bills",
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
