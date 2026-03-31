import {Download, Layers2, Mail} from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard.jsx";
import moment from "moment";

const IncomeList = ({transactions, onDelete}) => {


    return (

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div
                className="flex items-center justify-between border-b border-gray-500 pb-4 mb-4">
                {/* Title with a cleaner font weight */}
                <h5 className="text-lg font-bold text-gray-800 tracking-tight">Income
                    Sources</h5>

                {/* Button Container */}
                <div className="flex items-center gap-3">
                    {/* Email Button - Subtle & Clean */}
                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-600 text-sm font-semibold rounded-xl shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 active:scale-95">
                        <Mail size={16} className="text-indigo-500"/>
                        <span>Email</span>
                    </button>

                    {/* Download Button - Slight Accent */}
                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-semibold rounded-xl shadow-sm hover:bg-emerald-100 transition-all duration-200 active:scale-95">
                        <Download size={16} className="text-emerald-600"/>
                        <span>Download</span>
                    </button>
                </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                {/* Use a simple check for arrays */}
                {Array.isArray(transactions) && transactions.length > 0 ? (
                    transactions.map((income) => (
                        <TransactionInfoCard
                            key={income.id}
                            title={income.name}
                            icon={income.icon}
                            date={moment(income.date).format('Do MMM YYYY')}
                            amount={income.amount}
                            type="income"
                            // CHANGE THIS: Use onDelete to match the card's prop name
                            onDelete={() => onDelete(income)}
                        />
                    ))
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-12 border-2 border-dashed border-gray-100 rounded-2xl w-full">
                        <Layers2 className="text-gray-300 mb-3" size={40}/>
                        <p className="text-gray-400 font-medium text-center">
                            No Income Found yet. Please add some to view here.
                        </p>
                    </div>
                )}
            </div>


        </div>

    )
}

export default IncomeList;