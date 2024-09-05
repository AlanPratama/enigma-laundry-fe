import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";

export const PageLayout = ({ children }) => {
	return (
		<>
			<header>HEADERR</header>
			{children}
		</>
	);
};

export const DashboardPageLayout = () => {
	return (
		<div className="dashboard-layout flex">
			<aside className="w-1/4 bg-gray-200 h-screen p-4">Sidebar</aside>
			<main className="w-3/4 p-4">
				<Outlet />
			</main>
		</div>
	);
};

PageLayout.propTypes = {
	children: PropTypes.object,
};
