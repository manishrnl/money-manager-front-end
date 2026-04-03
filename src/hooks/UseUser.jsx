import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef } from "react";
import { API_ENDPOINTS } from "../util/API_ENDPOINTS.js";
import { AppContext } from "../context/AppContext.jsx";
import AxiosConfig from "../util/AxiosConfig.jsx"; // Ensure this matches your export type

export const UseUser = () => {
    const { setUser, clearUser, user } = useContext(AppContext);
    const navigate = useNavigate();
    const isFetching = useRef(false);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        if (!token) {
            navigate("/login");
            return;
        }

        if (user && user.id) {
            return;
        }

        const fetchUserInfo = async () => {
            if (isFetching.current) return;
            isFetching.current = true;

            try {
                const response = await AxiosConfig.get(API_ENDPOINTS.GET_USER_PROFILE);
                const userData = response.data.data || response.data;
                setUser(userData);
            } catch (error) {
                clearUser();
                navigate("/login");
            } finally {
                isFetching.current = false;
            }
        };

        fetchUserInfo();
    }, [user, setUser, clearUser, navigate]);

    // --- CRITICAL FIX: RETURN THE DATA ---
    return { user, setUser, clearUser };
};

export default UseUser;