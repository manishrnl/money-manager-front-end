import { useState } from "react";
import EmojiPickerPopup from "./EmojiPickerPopup.jsx";
import Input from "./Input.jsx";

const AddIncomeForm = ({ onAddIncome, categories }) => {
    const [income, setIncome] = useState({
        name: "",
        amount: "",
        date: "",
        icon: "",
        categoryId: ""
    });

    // Handle Change with a clean value pass
    const handleChange = (key, value) => {
        setIncome(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="space-y-4"> {/* Added spacing for premium layout */}
            <div className="flex justify-center mb-4">
                <EmojiPickerPopup
                    icon={income.icon}
                    onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
                />
            </div>

            <Input
                value={income.name}
                onChange={(e) => handleChange('name', e.target.value)}
                label="Income Source"
                placeholder="e.g., Salary, Freelance"
                type="text"
            />

            <div className="grid grid-cols-2 gap-4">
                <Input
                    value={income.amount}
                    onChange={(e) => handleChange('amount', e.target.value)}
                    label="Amount"
                    placeholder="0.00"
                    type="number"
                />
                <Input
                    value={income.date}
                    onChange={(e) => handleChange('date', e.target.value)}
                    label="Date"
                    type="date"
                />
            </div>

            {/* Don't forget your Category Dropdown/Select here! */}
        </div>
    );
};

export default AddIncomeForm;