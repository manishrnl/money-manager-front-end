import Dashboards from "../components/Dashboards.jsx";
import useUser from "../hooks/UseUser.jsx";
import {Plus} from "lucide-react";
import CategoryList from "../components/CategoryList.jsx";
import {useEffect, useState} from "react";
import axiosConfig from "../util/AxiosConfig.jsx";
import {API_ENDPOINTS} from "../util/API_ENDPOINTS.js";
import toast from "react-hot-toast";
import Modals from "../components/Modals.jsx";
import AddCategoryForm from "../components/AddCategoryForm.jsx";

const Category = () => {
    useUser();

    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState([]);

    // These states will be useful for your modals later
    const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const fetchCategoryDetails = async () => {
        setLoading(true);
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORY);
            console.log("Full Axios Object:", response);
            console.log("Just the JSON body:", response.data);
            // Your JSON structure has the list inside response.data.data
            if (response.data && response.data.data) {
                console.log('Categories fetched:', response.data.data);
                setCategoryData(response.data.data);
            }
        } catch (error) {
            console.error("Error encountered: ", error);
            toast.error(error.response?.data?.message || "Failed to fetch categories");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategoryDetails();
    }, []); // FIXED: Added empty dependency array to prevent infinite loop


    const handleAddCategory = (category) => {
        console.log("Category added successfully", category)
    }
    return (
        <Dashboards activeMenu="Category">
            <div className="my-5 mx-auto">
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-2xl font-semibold">All Categories</h2>
                    <button
                        onClick={() => setOpenAddCategoryModal(true)}
                        className="add-btn flex items-center gap-1 bg-green-200 text-green-900 px-4 py-2 rounded-lg hover:bg-green-700 hover:text-white transition"
                    >
                        <Plus size={15}/>
                        Add Category
                    </button>
                </div>

                {/* Pass the fetched data and loading state to your List component */}
                <CategoryList
                    categories={categoryData}
                    isLoading={loading}
                />

                {/* Adding category Modals */}
                <Modals
                    isOpen={openAddCategoryModal}
                    onClose={() => setOpenAddCategoryModal(false)}
                    title="Add Category">
                    <AddCategoryForm onAddCategory={handleAddCategory}/>
                </Modals>

                {/* Updating  category Modals */}
            </div>
        </Dashboards>
    );
};

export default Category;