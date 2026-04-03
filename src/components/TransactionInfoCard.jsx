import { Trash2, TrendingDown, TrendingUp, Layers2 } from "lucide-react";
import { addThousandsSeparator } from "../util/ThousandsSeparator.js";

const TransactionInfoCard = ({ icon, title, date, amount, type, hideDeleteBtn, onDelete }) => {

    // PREMIUM STYLES: Using soft backgrounds with deep text colors
    const getAmountStyles = () =>
        type === 'income'
            ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
            : 'bg-rose-50 text-rose-700 border-rose-100';

    const renderIcon = () => {
        // 1. Check for URL (Image)
        if (typeof icon === 'string' && (icon.startsWith('http') || icon.startsWith('/'))) {
            return (
                <img
                    src={icon}
                    alt="Transaction"
                    className="w-full h-full object-contain p-2"
                    onError={(e) => {
                        e.target.style.display = 'none';
                        // Show fallback icon if image fails
                        if (e.target.nextSibling) e.target.nextSibling.style.display = 'block';
                    }}
                />
            );
        }
        // 2. Check for Emoji string
        if (icon && icon.length > 0) {
            return <span className="text-2xl leading-none select-none">{icon}</span>;
        }
        // 3. Fallback to generic icon
        return <Layers2 size={20} className="text-slate-400" />;
    };

    return (
        <div className="group relative flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-100">

            {/* ICON BOX */}
            <div className="w-12 h-12 shrink-0 flex items-center justify-center bg-white shadow-sm border border-gray-100 rounded-xl group-hover:scale-105 transition-transform">
                {renderIcon()}
            </div>

            {/* CONTENT SECTION */}
            <div className="flex-1 flex items-center justify-between min-w-0">
                <div className="truncate pr-2">
                    <p className="text-sm text-slate-900 font-bold truncate">{title}</p>
                    <p className="text-[11px] text-slate-400 font-medium mt-0.5">{date}</p>
                </div>

                <div className="flex items-center gap-3">
                    {/* DELETE ACTION */}
                    {!hideDeleteBtn && (
                        <button
                            onClick={onDelete}
                            className="p-2 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
                        >
                            <Trash2 size={16}/>
                        </button>
                    )}

                    {/* AMOUNT BADGE */}
                    <div className={`flex items-center px-3 py-1.5 rounded-xl border shadow-sm ${getAmountStyles()}`}>
                        <h6 className="flex items-center gap-1.5 text-xs font-black whitespace-nowrap">
                            <span>
                                {type === 'income' ? '+' : '-'} ₹{addThousandsSeparator(amount)}
                            </span>
                            {type === 'income' ? (
                                <TrendingUp size={14} strokeWidth={3}/>
                            ) : (
                                <TrendingDown size={14} strokeWidth={3}/>
                            )}
                        </h6>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionInfoCard;