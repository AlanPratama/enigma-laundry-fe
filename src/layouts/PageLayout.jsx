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
		<div style={{ display: "flex" }}>
			<aside>Sidebar</aside>
			<main>
				<Outlet />
			</main>
		</div>
	);
};

PageLayout.propTypes = {
	children: PropTypes.object,
};
