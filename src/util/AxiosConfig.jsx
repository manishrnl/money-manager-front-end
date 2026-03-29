import axios from "axios";
import {BASE_URL} from "./API_ENDPOINTS.js"
export const AxiosConfig = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
})
// List of endpoints to exclude authorization
const excludeEndPoints = ["/profile/login", "/profile/register", "/status", "/health", "/profile/activate"];
// Request Interceptors
AxiosConfig.interceptors.request.use((config) => {
        const shouldSkipToken = excludeEndPoints.some((endPoint) => {
            config.url?.includes(endPoint)
        });

        if (!shouldSkipToken) {
            const accessToken = localStorage.getItem("token");
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
AxiosConfig.interceptors.response.use((response) => {
        return response;
    }, (error) => {
        if (error.response) {
            if (error.response.status === 401)
                window.location.href = "/login";
            else if (error.response.status === 500)
                console.log("Server error . Please try again Later");
        } else if (error.code === "ECONNABORTED")
            console.log("Request timed Out . Please try again");


        return Promise.reject(error);
    }
)