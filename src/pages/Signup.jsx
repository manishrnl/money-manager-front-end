import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {assets} from "../assets/assets.js";
import Input from "../components/Input.jsx";

const Signup = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    return (
        <div
            className="h-screen w-full relative flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <img
                src={assets.finance}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 z-0"
            />

            {/* The Card */}
            <div
                className="relative z-10 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-xl p-10 border border-white/20">
                <h3 className="text-3xl font-bold text-slate-900 text-center mb-2">
                    Create an Account
                </h3>
                <p className="text-sm text-slate-600 text-center mb-8">
                    Start tracking your spending by joining with us
                </p>

                <form className="space-y-5">
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
                    {error && (
                        <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">{error}</p>
                    )}
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all mt-4 shadow-lg shadow-blue-200"
                    >
                        Sign Up
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