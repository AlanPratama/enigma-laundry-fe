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
		<div className="flex">
			<aside>Sidebar</aside>
			<main className="w-full p-4">
				<Outlet />
			</main>
		</div>
	);
};

PageLayout.propTypes = {
	children: PropTypes.object,
};
