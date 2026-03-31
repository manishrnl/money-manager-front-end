import { Download, Layers2, Mail } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard.jsx";
import moment from "moment";

const IncomeList = ({ transactions, onDelete }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                <h5 className="text-xl font-bold text-gray-800 tracking-tight">Income Sources</h5>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-all active:scale-95">
                        <Mail size={16} className="text-indigo-500"/>
                        <span>Email</span>
                    </button>

                    <button className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-semibold rounded-xl hover:bg-emerald-100 transition-all active:scale-95">
                        <Download size={16} className="text-emerald-600"/>
                        <span>Download</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {Array.isArray(transactions) && transactions.length > 0 ? (
                    transactions.map((income) => (
                        <TransactionInfoCard
                            key={income.id}
                            title={income.name}
                            // This now passes the URL or Emoji string from the DB
                            icon={income.icon}
                            date={moment(income.date).format('Do MMM YYYY')}
                            amount={income.amount}
                            category={income.categoryName || "Income"}
                            type="income"
                            onDelete={() => onDelete(income)}
                        />
                    ))
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-16 border-2 border-dashed border-gray-100 rounded-3xl bg-gray-50/30">
                        <Layers2 className="text-gray-300 mb-3" size={48} strokeWidth={1.5} />
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