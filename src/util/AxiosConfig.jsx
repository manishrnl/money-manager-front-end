import axios from "axios";
import { BASE_URL } from "./API_ENDPOINTS.js";

export const AxiosConfig = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
});

const excludeEndPoints = [
    "/profile/login",
    "/profile/register",
    "/status",
    "/health",
    "/profile/activate"
];

// Request Interceptor: Attach Token
AxiosConfig.interceptors.request.use(
    (config) => {
        const shouldSkipToken = excludeEndPoints.some((endPoint) =>
            config.url?.includes(endPoint)
        );

        if (!shouldSkipToken) {
            const accessToken = localStorage.getItem("accessToken");
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401 Unauthorized
AxiosConfig.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Check if we are already on login to avoid redirect loops
            if (!window.location.pathname.includes("/login")) {
                localStorage.clear();
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default AxiosConfig;