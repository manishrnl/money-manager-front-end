// Destructure the props inside { }
const Input = ({ label, value, onChange, placeholder, type = "text" }) => {
    return (
        <div className="mb-4 w-full">
            {/* The actual text label above the input */}
            <label className="text-[13px] text-slate-800 block mb-1 font-medium">
                {label}
            </label>

            <div className="relative">
                {/* Changed from <label> to <input> */}
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
            </div>
        </div>
    );
};

export default Input;