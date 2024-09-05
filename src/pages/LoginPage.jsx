import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

import AuthApi from "../apis/AuthApi";

const LoginPage = () => {
	const navigate = useNavigate();
	const loginHandler = async () => {
		await AuthApi.login("employee", "password");
		navigate("/dashboard", { replace: true, state: { from: "/login" } });
	};

	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				height: "100vh",
			}}
		>
			<Button onClick={loginHandler}>Login</Button>
		</div>
	);
};

export default LoginPage;
