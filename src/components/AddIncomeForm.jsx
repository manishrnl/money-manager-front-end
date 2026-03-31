import {useEffect, useState} from "react";
import EmojiPickerPopup from "./EmojiPickerPopup.jsx";
import Input from "./Input.jsx";
import {LoaderCircle} from "lucide-react";

const AddIncomeForm = ({onAddIncome, categories}) => {
    const [loading, setLoading] = useState(false);
    const [income, setIncome] = useState({
        name: "",
        amount: "",
        // This creates a "YYYY-MM-DD" string for today
        date: new Date().toISOString().split('T')[0],
        icon: "",
        categoryId: ""
    });

    const handleChange = (key, value) => {
        setIncome({...income, [key]: value});
    };
    useEffect(() => {
        if (categories?.length > 0 && !income.categoryId) {
            const salaryCat = categories.find(
                (cat) => cat.name.toLowerCase() === "salary"
            );
            if (salaryCat) {
                setIncome(prev => ({...prev, categoryId: salaryCat.id}));
            } else {
                // Fallback to the first available category if "Salary" isn't found
                setIncome(prev => ({...prev, categoryId: categories[0].id}));
            }
        }
    }, [categories]);
    // Use optional chaining in case categories is undefined/null
    const categoryOptions = categories?.map(category => ({
        value: category.id,
        label: category.name
    })) || [];

    const handleAddIncome = async () => {
        setLoading(true);
        try {
            await onAddIncome(income);
        } finally {
            setLoading(false)
        }

    }
    return (
        <div className="space-y-5">
            {/* 1. Emoji Picker Centered */}
            <div className="flex justify-center mb-6">
                <EmojiPickerPopup
                    icon={income.icon}
                    onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
                />
            </div>

            {/* 2. Form Fields Grouped Correctly */}
            <div className="grid grid-cols-1 gap-4">
                <Input
                    value={income.name}
                    onChange={(e) => handleChange('name', e.target.value)} // Fixed: (e) => e.target.value
                    label="Income Source"
                    placeholder="e.g., Salary, Freelance"
                    type="text"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        value={income.amount}
                        onChange={(e) => handleChange('amount', e.target.value)}
                        label="Amount"
                        placeholder="e.g., 500.00"
                        type="number"
                    />
                    <Input
                        value={income.date}
                        onChange={(e) => handleChange('date', e.target.value)}
                        label="Date"
                        type="date"
                        max={new Date().toISOString().split('T')[0]} // Prevents future dates
                    />
                </div>

                <Input
                    value={income.categoryId}
                    onChange={(e) => handleChange('categoryId', e.target.value)}
                    label="Category"
                    isSelect={true}
                    options={categoryOptions}
                />
            </div>

            {/* 3. Improved Button with Loading State */}
            <div className="flex justify-end mt-8">
                <button
                    onClick={handleAddIncome}
                    disabled={loading}
                    className={`
            relative group flex items-center justify-center gap-3 px-8 py-3.5 
            rounded-xl font-bold text-sm tracking-wide transition-all duration-300
            ${loading
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-xl shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5 active:scale-95'}
        `}
                >
                    {loading ? (
                        <>
                            <LoaderCircle className="animate-spin text-indigo-500" size={20}/>
                            <span>Processing...</span>
                        </>
                    ) : (
                        <>
                            <span>Add Income</span>
                            {/* Subtle arrow icon that appears/moves on hover */}
                            <div
                                className="w-5 h-5 flex items-center justify-center bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
                                <svg
                                    width="12" height="12" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" strokeWidth="3" strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M5 12h14m-7-7 7 7-7 7"/>
                                </svg>
                            </div>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default AddIncomeForm;