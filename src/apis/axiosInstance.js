import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "/connect",
	timeout: 5000,
});

axiosInstance.interceptors.request.use(
	async (config) => {
		if (config.url.includes("login") || config.url.includes("register")) {
			return config;
		}

		const accessToken = localStorage.getItem("token");
		if (accessToken) {
			config.headers = {
				...config.headers,
				Authorization: `Bearer ${accessToken}`,
			};
		}
		return config;
	},
	(error) => {
		console.error("axiosInstance.interceptors.request Error:", error.message);
		return Promise.reject(error);
	}
);

export default axiosInstance;
