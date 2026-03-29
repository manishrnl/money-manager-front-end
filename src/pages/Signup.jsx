import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {assets} from "../assets/assets.js";
import Input from "../components/Input.jsx";

const Signup = () => {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    return (
        <div
            className="h-screen w-full relative flex items-center justify-center overflow-hidden">
            <img
                src={assets.finance}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 z-0"
            />

            <div
                className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto border border-white/20">
                <h3 className="text-2xl font-bold text-slate-900 text-center mb-2">
                    Create an Account
                </h3>
                <p className="text-sm text-slate-600 text-center mb-8">
                    Start tracking your spending by joining with us
                </p>

                <form className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                        <Input
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            label="Full Name"
                            placeholder="Enter Full Name"
                            type="text"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Signup;