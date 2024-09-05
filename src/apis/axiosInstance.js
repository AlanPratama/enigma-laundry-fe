import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8888/api/v1",
    headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJlbmlnbWFjYW1wIiwiZXhwIjoxNzI1NTMxNzgwLCJpYXQiOjE3MjU1MjgxODAsInVzZXJJZCI6ImRhNGFkODhiLTk5YjItNGJkZi04Y2M3LTU2M2Q0NjFkNTBlZSIsInJvbGUiOiJhZG1pbiIsInNlcnZpY2VzIjpudWxsfQ.T2OEzzqmEumpJCP1MudKQzV0Itcxeppi4ZrC5EBxBK4",
    },
})

export default axiosInstance