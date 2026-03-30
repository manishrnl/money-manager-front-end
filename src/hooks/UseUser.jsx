import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef } from "react";
import { API_ENDPOINTS } from "../util/API_ENDPOINTS.js";
import { AppContext } from "../context/AppContext.jsx";
import { AxiosConfig } from "../util/AxiosConfig.jsx";

export const UseUser = () => {
    const { setUser, clearUser, user } = useContext(AppContext);
    const navigate = useNavigate();
    const isFetching = useRef(false);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        // 1. If no token, they aren't logged in
        if (!token) {
            console.log("No token found. Redirecting...");
            navigate("/login");
            return;
        }

        // 2. If user already exists in Context (from localStorage init), STOP.
        if (user && user.id) {
            console.log("User found in state/storage, skipping DB call.");
            return;
        }

        // 3. Only fetch if we have a token but NO user data (e.g., storage cleared)
        const fetchUserInfo = async () => {
            if (isFetching.current) return;
            isFetching.current = true;

            try {
                console.log("Fetching user from DB...");
                const response = await AxiosConfig.get(API_ENDPOINTS.GET_USER_PROFILE);
                const userData = response.data.data || response.data;

                setUser(userData); // This now saves to localStorage via our Provider
            } catch (error) {
                console.error("Session invalid:", error);
                clearUser();
                navigate("/login");
            } finally {
                isFetching.current = false;
            }
        };

        fetchUserInfo();
    }, [user, setUser, clearUser, navigate]);
};

export default UseUser;