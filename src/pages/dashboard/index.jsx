import { useSelector } from "react-redux";
import DashboardPage from "./DashboardPage";

const index = () => {
	const { user } = useSelector((state) => state.auth);
	console.log(user);

	return (
		<div>
			<h1>index</h1>
			<DashboardPage/>
			{/* <p>hel {user.iss}</p> */}
		</div>
	);
};

export default index;
