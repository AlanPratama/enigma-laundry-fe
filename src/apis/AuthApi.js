import { jwtDecode } from "jwt-decode";

import { login, setError, setIsLoading } from "../redux/auth/authSlice";
import store from "../redux/store";
import axiosInstance from "./axiosInstance";

class AuthApi {
	static async login(username, password) {
		try {
			store.dispatch(setIsLoading(true));
			const { data } = await axiosInstance.post("auth/login", {
				username,
				password,
			});

			localStorage.setItem("token", data.data.token); // save token to local storage

			store.dispatch(login(jwtDecode(data.data.token))); // save user detail to redux auth state
		} catch (error) {
			store.dispatch(setError(error.message));
			console.error(error);
		} finally {
			store.dispatch(setIsLoading(false));
		}
	}
}

export default AuthApi;
