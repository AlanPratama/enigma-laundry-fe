import axios from "axios";

const axiosInstance = axios.create({
	headers: {
		Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJlbmlnbWFjYW1wIiwiZXhwIjoxNzI1NTQ0MjM2LCJpYXQiOjE3MjU1NDA2MzYsInVzZXJJZCI6ImRhNGFkODhiLTk5YjItNGJkZi04Y2M3LTU2M2Q0NjFkNTBlZSIsInJvbGUiOiJhZG1pbiIsInNlcnZpY2VzIjpudWxsfQ.HliiuV6-2fzMe0JdDQO5mRAphv8KN75q2aO2VBGmF7s"
	},
	baseURL: "/connect",
	timeout: 5000,
});

axiosInstance.interceptors.request.use(
	async (config) => {
		if (config.url.includes("login") || config.url.includes("register")) {
			return config;
		}

		return config;
	},
	(error) => {
		console.error("axiosInstance.interceptors.request Error:", error.message);
		return Promise.reject(error);
	}
);

export default axiosInstance;
