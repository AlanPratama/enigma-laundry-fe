import { jwtDecode } from "jwt-decode";

import { login, setError, setIsLoading } from "../redux/auth/authSlice";
import store from "../redux/store";
import axiosInstance from "./axiosInstance";
import { toast } from "sonner";

class AuthApi {
	static async login(username, password) {
		try {
			store.dispatch(setError(null));
			store.dispatch(setIsLoading(true));
			const { data } = await axiosInstance.post("auth/login", {
				username,
				password,
			});

			localStorage.setItem("token", data.data.token); // save token to local storage

			store.dispatch(login(jwtDecode(data.data.token))); // save user detail to redux auth state
			toast.success("Login Success");
		} catch (error) {
			store.dispatch(setError(error.message));
			console.error(error);
			toast.error("Invalid username or password");
		} finally {
			store.dispatch(setIsLoading(false));
		}
	}
}

export default AuthApi;
