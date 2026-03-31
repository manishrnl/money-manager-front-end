import {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {assets} from "../assets/assets.js";
import Input from "../components/Input.jsx";
import {AxiosConfig} from "../util/AxiosConfig.jsx";
import {API_ENDPOINTS} from "../util/API_ENDPOINTS.js";
import {
    checkFullName,
    checkPasswordAndConfirmPassword,
    getPasswordStrength,
    validateEmail
} from "../util/Validation.js";
import toast from "react-hot-toast";
import {LoaderPinwheel} from "lucide-react";
import ProfilePhotSelectors from "../components/ProfilePhotSelectors.jsx";
import uploadProfileImage from "../util/UploadProfileImage.js";
import {AppContext} from "../context/AppContext.jsx";

const Signup = () => {
    const [countdown, setCountdown] = useState(5);// For timer of 5 seconds toast to redirect automatically to /login page
    const [fullName, setFullName] = useState("Manish Kumar");
    const [email, setEmail] = useState("email@zohomail.in");
    const [password, setPassword] = useState("Manish@123456");
    const [confirmPassword, setConfirmPassword] = useState("Manish@123456");
    const [error, setError] = useState("");
    const [profilePhoto, setProfilePhoto] = useState("");
    const navigate = useNavigate();
    const strengthCheck = getPasswordStrength(password);
    const [isLoading, setIsLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        let profileImageUrl = "";
        setIsLoading(true);
        setError("");

        const nameError = checkFullName(fullName);
        if (nameError) {
            setIsLoading(false);
            toast.error(nameError);
            return;
        }

        if (!validateEmail(email)) {
            setIsLoading(false);
            toast.error("Please enter a valid email address");
            return;
        }

        const passwordError = checkPasswordAndConfirmPassword(password, confirmPassword);
        if (passwordError) {
            setIsLoading(false);
            toast.error(passwordError);
            return;
        }

        try {
            if (profilePhoto) {
                const imageUrl = await uploadProfileImage(profilePhoto);
                profileImageUrl = imageUrl || "";


            }
            const response = await AxiosConfig.post(API_ENDPOINTS.REGISTER, {
                fullName,
                email,
                password, profileImageUrl,
            });

            if (response.status === 201) {
                toast.success("Profile created successfully.");
                navigate("/login");
            }
        } catch (error) {
            if (error.response?.status === 409) {
                let secondsLeft = 5;

                const toastId = toast("Email already registered. Redirecting in 5 seconds", {
                    icon: '⚠️',
                    duration: 6000,
                    style: {
                        borderRadius: '10px',
                        background: '#fef9c3',
                        color: '#854d0e',
                        border: '1px solid #facc15',
                    },
                });

                const timer = setInterval(() => {
                    secondsLeft -= 1;

                    // Update the existing toast text
                    toast(`Email already registered. Redirecting you to login page in ${secondsLeft} seconds`, {
                        id: toastId, // This targets the specific toast we just made
                        icon: '⚠️',
                        style: {
                            borderRadius: '10px',
                            background: '#fef9c3',
                            color: '#854d0e',
                            border: '2px solid #facc15',
                        },
                    });

                    if (secondsLeft <= 0) {
                        clearInterval(timer);
                        navigate("/login");
                        toast.dismiss();
                    }
                }, 1000);

                return;
            }
            console.error("Registration Error:", error);
            const errorMessage = error.response?.data?.message || "An unexpected error occurred";
            toast.error(errorMessage);

        } finally {
            setIsLoading(false);
        }


    }
    return (
        /* min-h-screen allows the page to grow, overflow-y-auto enables scrolling */
        <div className="min-h-screen w-full relative flex items-center justify-center overflow-y-auto py-10">
            {/* Background Image */}
            <img
                src={assets.finance}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 z-0"
            />

            {/* The Card */}
            <div
                className="relative z-10 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl w-60% p-10 border border-white/20">
                <h3 className="text-3xl font-bold text-slate-900 text-center mb-2">
                    Create an Account
                </h3>
                <p className="text-sm text-slate-600 text-center mb-8">
                    Start tracking your spending by joining with us
                </p>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="flex justify-center mb-6">
                        <ProfilePhotSelectors image={profilePhoto} setImage={setProfilePhoto}/>
                    </div>
                    {/* Full Name - Full Width */}
                    <Input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        label="Full Name"
                        placeholder="Manish Kumar"
                        type="text"
                    />

                    {/* Email - Full Width */}
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        label="Email Address"
                        placeholder="sample@zohomail.in"
                        type="email"
                    />

                    {/* Password Section - Two Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <Input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            label="Password"
                            placeholder="*************"
                            type="password"
                        />

                        <Input
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            label="Confirm Password"
                            placeholder="*************"
                            type="password"
                        />
                    </div>


                    {/* REAL-TIME FEEDBACK SECTION */}
                    {password.length > 0 && (
                        <div
                            className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
                            {strengthCheck.map((check, index) => (
                                <div key={index}
                                     className="flex items-center gap-2 text-[11px]">
                                    <div
                                        className={`w-2 h-2 rounded-full ${check.met ? 'bg-green-500' : 'bg-slate-300'}`}/>
                                    <span
                                        className={check.met ? 'text-green-700 font-medium' : 'text-slate-500'}>
                                {check.label}
                            </span>
                                </div>
                            ))}
                        </div>
                    )}


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
                                <span className="text-white">Signing Up...</span>
                            </div>
                        ) : (
                            "Sign up"
                        )}
                    </button>


                    <p className="text-center text-sm text-slate-600 mt-4">
                        Already have an account? <span
                        className="text-blue-600 cursor-pointer hover:underline"
                        onClick={() => navigate('/login')}>Login</span>
                    </p>
                </form>
            </div>
        </div>
    );
};
export default Signup;