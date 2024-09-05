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

	(error) => {
		console.error("axiosInstance.interceptors.request Error:", error.message);
		return Promise.reject(error);
	}
    // const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJlbmlnbWFjYW1wIiwiZXhwIjoxNzI1NTU3NTE0LCJpYXQiOjE3MjU1NTM5MTQsInVzZXJJZCI6ImRhNGFkODhiLTk5YjItNGJkZi04Y2M3LTU2M2Q0NjFkNTBlZSIsInJvbGUiOiJhZG1pbiIsInNlcnZpY2VzIjpudWxsfQ.bGGt6qryTgiZYCoFXCVzMzmqr5wxmDiJk-SsZZu_L1g";
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
