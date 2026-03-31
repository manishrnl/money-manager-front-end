import { useState } from "react";
import Input from "./Input.jsx";
import EmojiPickerPopup from "./EmojiPickerPopup.jsx";
import toast from "react-hot-toast";

const AddCategoryForm = ({ onAddCategory }) => {
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState({
        name: "",
        type: "income",
        icon: ""
    });

    const handleChange = (key, value) => {
        setCategory({ ...category, [key]: value });
    };

    const handleSubmit = async () => {
        if (!category.name.trim()) {
            return toast.error("Please enter a category name");
        }

        setLoading(true);
        try {
            // Call the function passed from Category.jsx
            await onAddCategory(category);

            // Reset form on success
            setCategory({ name: "", type: "income", icon: "" });
        } catch (error) {
            console.error("Submit error:", error);
        } finally {
            setLoading(false);
        }
    };

    const categoryTypeOptions = [
        { value: "income", label: "INCOME" },
        { value: "expense", label: "EXPENSE" },
    ];

    return (
        <div className="p-4">
            <EmojiPickerPopup
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
                icon={category.icon}
            />

            <Input
                value={category.name}
                onChange={({ target }) => handleChange("name", target.value)}
                label="Category Name"
                placeholder="e.g., Freelance, Salary, Groceries"
                type="text"
            />

            <Input
                label="Category Type"
                value={category.type}
                onChange={({ target }) => handleChange("type", target.value)}
                isSelect={true}
                options={categoryTypeOptions}
            />

            <div className="flex justify-end mt-8 border-t border-gray-100 pt-6">
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    type="button"
                    className="relative flex items-center justify-center px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 disabled:bg-gray-400 disabled:shadow-none disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        "Add Category"
                    )}
                </button>
            </div>
        </div>
    );
};

export default AddCategoryForm;