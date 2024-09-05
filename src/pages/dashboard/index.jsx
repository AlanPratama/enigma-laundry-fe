import { useSelector } from "react-redux";

const DashboardPage = () => {
	const { user } = useSelector((state) => state.auth);
	console.log(user);

	return (
		<div>
			<h1>DashboardPage</h1>
			<p>hello {user.iss}</p>
		</div>
	);
};

export default DashboardPage;
