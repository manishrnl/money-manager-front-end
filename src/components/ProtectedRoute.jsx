import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AppContext);
    const location = useLocation();
    const token = localStorage.getItem("accessToken");

    if (!token) {
        // We pass 'unauthorized: true' in the state so the Login page knows why they are there
        return <Navigate
            to="/login"
            state={{ from: location.pathname, unauthorized: true }}
            replace
        />;
    }

    return children;
};

export default ProtectedRoute;