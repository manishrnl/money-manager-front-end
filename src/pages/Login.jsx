import {useContext, useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Input from "../components/Input.jsx";
import {AxiosConfig} from "../util/AxiosConfig.jsx";
import {API_ENDPOINTS} from "../util/API_ENDPOINTS.js";
import toast from "react-hot-toast";
import {LoaderPinwheel} from "lucide-react";
import {AppContext} from "../context/AppContext.jsx";

const Login = () => {

    // const [countdown, setCountdown] = useState(5);// For timer of 5 seconds toast to redirect automatically to /signup page
    const [email, setEmail] = useState("89@zohomail.in");
    // const [fullName, setFullName] = useState(null);
    const [password, setPassword] = useState("password");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const {setUser} = useContext(AppContext);


    const location = useLocation();
    const hasToasted = useRef(false); // Prevents double-toasting in Strict Mode

    useEffect(() => {
        document.title = "Login - Money Manager";
        window.scrollTo({ top: 0, behavior: "smooth" });
        const state = location.state;
        // Check if the user was redirected here because they weren't authorized
        if (state?.unauthorized && !hasToasted.current) {
            const pageName = state.from
                ? state.from.replace("/", "").toUpperCase()
                : "that page";

            toast.error(`Routes are secured . Please login to access page ${pageName}`, {
                id: "auth-denied", // Giving it an ID prevents duplicate toasts
                duration: 4000,
            });
            hasToasted.current = true;
        }
    }, [location]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        if (!email || !password) {
            toast.error("Please fill in all fields");
            setIsLoading(false);
            return;
        }

        try {
            const response = await AxiosConfig.post(API_ENDPOINTS.LOGIN, {email, password});

            // If your backend returns 200 but has an error object inside (unlikely but possible)
            if (response.data?.error) {
                toast.error(response.data.error.message);
                setIsLoading(false);
                return;
            }

            if (response.status === 200) {
                const userData = response.data.data; // Access the "data" field from your JSON

                if (userData && userData.accessToken) {
                    localStorage.setItem("accessToken", userData.accessToken);
                    localStorage.setItem("refreshToken", userData.refreshToken);

                    setUser({
                        id: userData.id,
                        fullName: userData.fullName,
                        email: email,
                        profileImageUrl: userData.profileImageUrl
                    });

                    toast.success("Welcome back! Login Successful");
                    setTimeout(() => navigate("/dashboard"), 100);
                } else {
                    toast.error("Login failed: Token not found in response.");
                }
            }
        } catch (error) {
            // --- IMPROVED ERROR HANDLING ---
            const responseData = error.response?.data;
            const status = error.response?.status;

            // Extracting the message based on your specific JSON: response.data.error.message
            const serverMessage = responseData?.error?.message
                || responseData?.message
                || "An unexpected error occurred";

            if (!error.response) {
                toast.error("Server unreachable. Please check your connection.");
            } else if (status === 404) {
                handleAccountNotFoundCountdown();
            } else if (status === 403 || status === 401 || status === 500) {
                // This will now correctly show "Account is not Active..."
                // even if the backend returns it as a 500 error.
                toast.error(serverMessage);
            } else {
                toast.error(serverMessage);
            }

            console.error("Login Error Details:", responseData);
        } finally {
            setIsLoading(false);
        }
    };


// Helper for the countdown to keep handleSubmit clean
    const handleAccountNotFoundCountdown = () => {
        let secondsLeft = 5;
        const toastId = toast.loading(`Account not found. Redirecting in ${secondsLeft}s...`);

        const timer = setInterval(() => {
            secondsLeft -= 1;
            if (secondsLeft <= 0) {
                clearInterval(timer);
                toast.dismiss(toastId);
                navigate("/signup");
            } else {
                toast(`Account not found. Redirecting to Signup in ${secondsLeft}s`, {
                    id: toastId,
                    icon: '⚠️',
                    style: {
                        background: '#fef9c3',
                        color: '#854d0e',
                        border: '2px solid #facc15'
                    }
                });
            }
        }, 1000);
    };

    return (
        <div
            className="h-screen w-full relative flex items-center justify-center overflow-hidden">

            {/* The Card */}
            <div
                className="relative z-10 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-xl p-10 border border-white/20">
                <h3 className="text-3xl font-bold text-slate-900 text-center mb-2">
                    Welcome Back
                </h3>
                <p className="text-sm text-slate-600 text-center mb-8">
                    Please enter your details to Login
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5">

                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        label="Email Address"
                        placeholder="sample@zohomail.in"
                        type="email"
                    />


                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="Password"
                        placeholder="*************"
                        type="password"
                    />

                    {error && (
                        <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">{error}</p>
                    )}


                    {/* Submit Button */}
                    <button

                        disabled={isLoading}
                        type="submit"
                        className={`w-full font-semibold py-3 rounded-lg transition-all mt-4 shadow-lg flex items-center justify-center gap-2 
                        ${isLoading ? 'bg-violet-800 cursor-not-allowed' : 'bg-violet-950 hover:bg-violet-500 shadow-blue-200 text-white'}`}>
                        {isLoading ? (
                            <div className="flex items-center gap-2">
                                {/* Use animate-spin for a rotating loader, or animate-bounce for jumping */}
                                <LoaderPinwheel
                                    className="animate-spin w-5 h-5 text-white"/>
                                <span className="text-white">Logging In...</span>
                            </div>
                        ) : (
                            "Log In"
                        )}
                    </button>


                    <p className="text-center text-sm text-slate-600 mt-4">
                        Don't have an account? <span
                        className="text-blue-600 cursor-pointer hover:underline"
                        onClick={() => navigate('/signup')}>Signup</span>
                    </p>
                </form>
            </div>
        </div>
    )
}
export default Login;