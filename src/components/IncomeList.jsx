import {Download, Layers2, LoaderPinwheel, Mail} from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard.jsx";
import moment from "moment";
import UseUser from "../hooks/UseUser.jsx";
import {useState} from "react";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";
import AxiosConfig from "../util/AxiosConfig.jsx";
import {API_ENDPOINTS} from "../util/API_ENDPOINTS.js";

const IncomeList = ({transactions, onDelete}) => {
    const {user} = UseUser(); // Invoke the hook to get user data
    const [loadingEmail, setLoadingEmail] = useState(false);
    const [loadingExports, setLoadingExports] = useState(false);

    // --- Function: Export to Excel ---
    const handleExportToExcel = () => {
        let index = 0;
        if (!transactions || transactions.length === 0) {
            return toast.error("No data available to export");
        }

        setLoadingExports(true);
        try {
            // 1. Prepare the data (Mapping for cleaner headers)
            const excelData = transactions.map((item) => ({
                Sl_No: ++index,
                Income_Source: item.name,
                Amount: item.amount,
                Category: item.categoryName || "Income",
                Date: moment(item.date).format("YYYY-MM-DD"),
            }));

            // 2. Create worksheet and workbook
            const worksheet = XLSX.utils.json_to_sheet(excelData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Incomes");

            // 3. Trigger download
            XLSX.writeFile(workbook, `${user.fullName}_Income_Report_${moment().format("YYYYMMDD")}.xlsx`);
            toast.success("Excel file downloaded successfully!");
        } catch (error) {
            toast.error("Failed to export Excel file");
            console.error(error);
        } finally {
            setLoadingExports(false);
        }
    };

    // --- Function: Send Email ---
    const handleSendEmail = async () => {
        if (!user?.email) {
            return toast.error("User email not found");
        }

        setLoadingEmail(true);
        try {
            // Assuming your backend has an endpoint to trigger an email report
            const response = await AxiosConfig.post(API_ENDPOINTS.SEND_INCOME_REPORT, {
                email: user.email,
                data: transactions // Optional: send data if backend is stateless
            });

            if (response.status === 200) {
                toast.success(`Report sent to ${user.email}`);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send email");
        } finally {
            setLoadingEmail(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div
                className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                <h5 className="text-xl font-bold text-gray-800 tracking-tight">Income
                    Sources</h5>

                <div className="flex items-center gap-3">
                    <button
                        disabled={loadingEmail}
                        onClick={handleSendEmail}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-all active:scale-95 disabled:opacity-50"
                    >
                        {loadingEmail ? (
                            <LoaderPinwheel size={16}
                                            className="animate-spin text-indigo-500"/>
                        ) : (
                            <Mail size={16} className="text-indigo-500"/>
                        )}
                        <span>{loadingEmail ? "Sending..." : "Email"}</span>
                    </button>

                    <button
                        disabled={loadingExports}
                        onClick={handleExportToExcel}
                        className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-semibold rounded-xl hover:bg-emerald-100 transition-all active:scale-95 disabled:opacity-50"
                    >
                        {loadingExports ? (
                            <LoaderPinwheel size={16}
                                            className="animate-spin text-emerald-600"/>
                        ) : (
                            <Download size={16} className="text-emerald-600"/>
                        )}
                        <span>{loadingExports ? "Exporting..." : "Download"}</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {Array.isArray(transactions) && transactions.length > 0 ? (
                    transactions.map((income) => (
                        <TransactionInfoCard
                            key={income.id}
                            title={income.name}
                            icon={income.icon || ""}
                            date={moment(income.date).format('Do MMM YYYY')}
                            amount={income.amount}
                            category={income.categoryName || "INCOME"}
                            type="income"
                            onDelete={() => onDelete(income)}
                        />
                    ))
                ) : (
                    <div
                        className="col-span-full flex flex-col items-center justify-center py-16 border-2 border-dashed border-gray-100 rounded-3xl bg-gray-50/30">
                        <Layers2 className="text-gray-300 mb-3" size={48} strokeWidth={1.5}/>
                        <p className="text-gray-400 font-medium text-center">
                            No Income Found yet.<br/>
                            <span className="text-sm font-normal">Add a source to start tracking.</span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default IncomeList;