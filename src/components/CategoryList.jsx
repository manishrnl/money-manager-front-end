import {
    Layers2,
    Pencil,
    Trash2,
    Car,
    Utensils,
    Briefcase,
    Zap,
    ShoppingBag,
    HeartPulse,
    Home
} from "lucide-react";

const ICON_MAP = {
    "directions_car": Car,
    "restaurant": Utensils,
    "payments": Briefcase,
    "bolt": Zap,
    "shopping_cart": ShoppingBag,
    "medical_services": HeartPulse,
    "home": Home,
};

const CategoryList = ({ categories, onEditCategory, onDeleteCategory }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
                <h4 className="text-xl font-bold text-gray-800 tracking-tight">Category Sources</h4>
                <span className="px-3 py-1 bg-gray-50 text-gray-500 text-xs font-medium rounded-full border border-gray-100">
                    {categories.length} Total
                </span>
            </div>

            {categories.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-gray-100 rounded-2xl">
                    <Layers2 className="text-gray-300 mb-3" size={40} />
                    <p className="text-gray-400 font-medium">No Categories added yet</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {categories.map((category) => {
                        const IconComponent = ICON_MAP[category.icon] || Layers2;
                        // Use toUpperCase() to ensure the color check is robust
                        const isIncome = category.type?.toUpperCase() === 'INCOME';

                        return (
                            <div
                                key={category.id}
                                className="group relative flex items-center gap-4 p-4 rounded-xl border border-transparent bg-gray-50/50 hover:bg-white hover:border-gray-200 hover:shadow-md transition-all duration-300"
                            >
                                <div className="w-12 h-12 shrink-0 flex items-center justify-center rounded-xl bg-white shadow-sm border border-gray-100 group-hover:scale-110 transition-transform duration-300">
                                    <IconComponent
                                        size={22}
                                        className={isIncome ? 'text-emerald-500' : 'text-indigo-500'}
                                    />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-gray-900 truncate">
                                        {category.name}
                                    </p>
                                    <span className={`text-[10px] uppercase font-bold tracking-wider ${
                                        isIncome ? 'text-emerald-500' : 'text-rose-500'
                                    }`}>
                                        {category.type}
                                    </span>
                                </div>

                                {/* Actions - Corrected Placement */}
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                    <button
                                        onClick={() => onEditCategory?.(category)}
                                        className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                        title="Edit"
                                    >
                                        <Pencil size={16} />
                                    </button>
                                    <button
                                        onClick={() => onDeleteCategory?.(category)} // Just pass the object up
                                        className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default CategoryList;