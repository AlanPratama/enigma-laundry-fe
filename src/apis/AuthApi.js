import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

import { login, setError, setIsLoading } from "../redux/auth/authSlice";
import store from "../redux/store";
import axiosInstance from "./axiosInstance";

class AuthApi {
	static async login(username, password) {
		try {
			store.dispatch(setError(null));
			store.dispatch(setIsLoading(true));
			const { data } = await axiosInstance.post("/auth/login", {
				username,
				password,
			});

			localStorage.setItem("token", data.data.token); // save token to local storage

			store.dispatch(login(jwtDecode(data.data.token))); // save user detail to redux auth state
		} catch (error) {
			store.dispatch(setError(error.message));
			if (error.response.data.status.description.includes("invalid")) {
				toast.error(error.response.data.status.description);
			}
			throw new Error("AuthApi login: ", error.message);
		} finally {
			store.dispatch(setIsLoading(false));
		}
	}

	static async register(userData) {
		try {
			store.dispatch(setError(null));
			store.dispatch(setIsLoading(true));
			await axiosInstance.post("auth/register", { ...userData, role: "employee" });

			redirect("/login");
		} catch (error) {
			store.dispatch(setError(error.message));
			throw new Error("AuthApi register: ", error.message);
		} finally {
			store.dispatch(setIsLoading(false));
		}
	}
}

export default AuthApi;
