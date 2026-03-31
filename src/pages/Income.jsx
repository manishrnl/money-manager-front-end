import Dashboards from "../components/Dashboards.jsx";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import AxiosConfig from "../util/AxiosConfig.jsx";
import {API_ENDPOINTS} from "../util/API_ENDPOINTS.js";
import IncomeList from "../components/IncomeList.jsx";
import Modals from "../components/Modals.jsx";
import {Plus} from "lucide-react";

const Income = () => {

    const [incomeData, setIncomeData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false)
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    })


    const fetchIncomeDetails = async () => {
        setLoading(true);
        try {
            const response = await AxiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);
            // Check if the array is nested inside response.data.data
            const actualData = response.data?.data || response.data;

            if (Array.isArray(actualData)) {
                setIncomeData(actualData);
            } else {
                console.error("Data received is not an array:", actualData);
                setIncomeData([]);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error encountered");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIncomeDetails();
    }, [])


    return (
        <div>
            <Dashboards activeMenu="Income">
                <div className="my-5 mx-auto">
                    <div className="grid grid-cols-1 gap-6"><h2
                        className="text-2xl font-semibold">All Incomes</h2>
                        <div>
                            {/*Overview for line charts*/}

                            <button
                                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-emerald-100 hover:bg-emerald-700 hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
                                onClick={() => setOpenAddIncomeModal(true)}
                            >
                                <Plus size={18} strokeWidth={3} />
                                <span>Add Income</span>
                            </button>
                        </div>

                        <IncomeList
                            onDelete={(id) => console.log('deleting income', id)}
                            transactions={incomeData}/>

                        {/*    Add Income Modal*/}
                        <Modals
                            isOpen={openAddIncomeModal}
                            onClose={() => setOpenAddIncomeModal(false)}
                            title="Add Income"
                        >
                            Income from the modals
                        </Modals>

                    </div>
                </div>


            </Dashboards>
        </div>
    )
}
export default Income;