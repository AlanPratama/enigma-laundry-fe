import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
	const { isAuthenticated } = useSelector((state) => state.auth);

	return isAuthenticated ? children : <Navigate to='/login' replace />;
}

ProtectedRoute.propTypes = {
	children: PropTypes.element.isRequired,
};

export default ProtectedRoute;
