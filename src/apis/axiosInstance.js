import axios from "axios";
import { ToastAndroid } from "react-native";

import AuthApi from "./AuthApi";

export const axiosInstance = axios.create({
	baseURL: process?.env?.EXPO_PUBLIC_API_URL || "http://10.10.103.151:8080/api",
	timeout: 5000,
});

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		const originalRequest = error.config;
		if (error?.response?.status === 401 && !originalRequest._retry) {
			await AuthApi.logout();
			ToastAndroid.show("Your session has ben end, Please login again!", 5000);
		}
	}
);
