import axios from "axios";
import {BASE_URL} from "./API_ENDPOINTS.js"

export const AxiosConfig = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
})

const excludeEndPoints = ["/profile/login", "/profile/register", "/status", "/health", "/profile/activate"];

// Request Interceptors
AxiosConfig.interceptors.request.use((config) => {
        const shouldSkipToken = excludeEndPoints.some((endPoint) =>
            config.url?.includes(endPoint));

        if (!shouldSkipToken) {
            const accessToken = localStorage.getItem("accessToken");
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
        }

        return config;
    }, (error) => {
        return Promise.reject(error);
    }
)


// Response Interceptors
AxiosConfig.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                // Clear storage on auth failure
                localStorage.clear();
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

// Add export statement at both places as export default AxiosConfig && export const AxiosConfig =axios.create({...})
export default AxiosConfig;