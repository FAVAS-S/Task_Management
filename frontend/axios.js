import axios from "axios";
const axiosInstance = axios.create({
    baseURL: "https://task-e6bzjkx3x-favas-s-projects.vercel.app/api", 
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;