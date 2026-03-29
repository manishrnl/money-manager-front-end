import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Input from "../components/Input.jsx";
import {AxiosConfig} from "../util/AxiosConfig.jsx";
import {API_ENDPOINTS} from "../util/API_ENDPOINTS.js";
import toast from "react-hot-toast";
import {LoaderPinwheel} from "lucide-react";

const Login = () => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        // 1. Basic Frontend Validation (Prevent unnecessary API calls)
        if (!email || !password) {
            toast.error("Please fill in all fields");
            setIsLoading(false);
            return;
        }

        try {
            const response = await AxiosConfig.post(API_ENDPOINTS.LOGIN, {
                email,
                password,
            });

            if (response.status === 200) {
                // Success! Store your token/user data here if needed
                toast.success("Welcome back! Login Successful");
                navigate("/dashboard");
            }
        } catch (error) {
            // 2. Handle Specific HTTP Status Codes
            const status = error.response?.status;
            const serverMessage = error.response?.data?.message;

            if (status === 401) {
                // Wrong Password
                toast("Invalid Password. Please try again.", {
                    icon: '⚠️',
                    style: { background: '#fef9c3', color: '#854d0e', border: '1px solid #facc15' },
                });
            } else if (status === 404) {
                // User doesn't exist
                toast.error("Account not found. Please sign up first.");
            } else if (status === 400) {
                // Validation error from backend
                toast.error(serverMessage || "Invalid email or password format");
            } else if (status >= 500) {
                // Server is down
                toast.error("Server is currently unreachable. Try again later.");
            } else {
                // Network error or unknown
                const errorMessage = serverMessage || "Connection failed. Check your internet.";
                setError(errorMessage);
                toast.error(errorMessage);
            }

            console.error("Login Error Details:", error);
        } finally {
            // 3. Always stop the loader
            setIsLoading(false);
        }
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
                                <LoaderPinwheel className="animate-spin w-5 h-5 text-white"/>
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