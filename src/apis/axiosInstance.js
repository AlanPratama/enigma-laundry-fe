import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.BE_BASE_URL_DEVELOPMENT || "http://localhost:8888/api/v1",
    timeout: 5000
})

export default axiosInstance