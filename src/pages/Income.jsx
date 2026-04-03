import { useEffect, useState, useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";

import Dashboards from "../components/Dashboards.jsx";
import IncomeList from "../components/IncomeList.jsx";
import Modals from "../components/Modals.jsx";
import AddIncomeForm from "../components/AddIncomeForm.jsx";
import AxiosConfig from "../util/AxiosConfig.jsx";
import { API_ENDPOINTS } from "../util/API_ENDPOINTS.js";

const Income = () => {
    // Grouped States
    const [incomeData, setIncomeData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Modal States - Simplified to booleans for clarity
    const [incomeToDelete, setIncomeToDelete] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    useEffect(() => {
        document.title = "Income - Money Manager";
        window.scrollTo({ top: 0, behavior: "smooth" });
        loadInitialData();
    }, []);

    // Helper to load all data at once
    const loadInitialData = async () => {
        setLoading(true);
        await Promise.all([fetchIncomeDetails(), fetchIncomeCategories()]);
        setLoading(false);
    };

    const fetchIncomeDetails = async () => {
        try {
            const { data } = await AxiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);
            setIncomeData(data?.data || data || []);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to load incomes");
        }
    };

    const fetchIncomeCategories = async () => {
        try {
            const { data } = await AxiosConfig.get(API_ENDPOINTS.GET_CATEGORY_BY_TYPE("INCOME"));
            setCategories(data?.data || data || []);
        } catch (error) {
            console.error("Category Fetch Error:", error);
        }
    };

    // UseCallback to prevent unnecessary re-renders of IncomeList
    const handleConfirmDeleteClick = useCallback((income) => {
        setIncomeToDelete(income);
        setIsDeleteModalOpen(true);
    }, []);

    const handleDeleteExecution = async () => {
        if (!incomeToDelete?.id) return;
        setLoading(true);
        try {
            await AxiosConfig.delete(API_ENDPOINTS.DELETE_INCOME_BY_ID(incomeToDelete.id));
            toast.success("Income record deleted");
            setIsDeleteModalOpen(false);
            setIncomeToDelete(null);
            fetchIncomeDetails();
        } catch (error) {
            toast.error(error.response?.data?.message || "Delete failed");
        } finally {
            setLoading(false);
        }
    };

    const handleAddSubmit = async (formData) => {
        const { name, amount, date, categoryId, icon } = formData;

        if (!name.trim() || !amount || amount <= 0 || !date) {
            return toast.error("Please fill all required fields correctly");
        }

        setIsSubmitting(true);
        try {
            await AxiosConfig.post(API_ENDPOINTS.ADD_INCOME, {
                ...formData,
                amount: Number(amount)
            });
            toast.success("Income added successfully!");
            setIsAddModalOpen(false);
            fetchIncomeDetails();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add income");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dashboards activeMenu="Income">
            <div className="my-5 mx-auto">
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-2xl font-semibold text-gray-800">All Incomes</h2>
                    <button
                        className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white text-sm font-bold rounded-xl shadow-md hover:bg-emerald-700 transition-transform active:scale-95"
                        onClick={() => setIsAddModalOpen(true)}
                    >
                        <Plus size={18} strokeWidth={3} />
                        <span>Add Income</span>
                    </button>
                </div>

                <IncomeList
                    onDelete={handleConfirmDeleteClick}
                    transactions={incomeData}
                    isLoading={loading}
                />

                {/* Add Income Modal */}
                <Modals
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                    title="Add New Income"
                >
                    <AddIncomeForm
                        onAddIncome={handleAddSubmit}
                        categories={categories}
                        isSubmitting={isSubmitting}
                    />
                </Modals>

                {/* Delete Confirmation Modal */}
                <Modals
                    isOpen={isDeleteModalOpen}
                    onClose={() => {
                        setIsDeleteModalOpen(false);
                        setIncomeToDelete(null);
                    }}
                    title="Confirm Deletion"
                >
                    <div className="space-y-6 p-2 text-center">
                        <p className="text-gray-600">
                            Are you sure you want to delete <span className="font-bold">"{incomeToDelete?.name}"</span>?
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteExecution}
                                disabled={loading}
                                className="flex-1 px-4 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 disabled:opacity-50"
                            >
                                {loading ? "Deleting..." : "Yes, Delete"}
                            </button>
                        </div>
                    </div>
                </Modals>
            </div>
        </Dashboards>
    );
};

export default Income;