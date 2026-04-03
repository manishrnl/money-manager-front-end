export const BASE_URL = "https://money-manager-backend-2w6b.onrender.com/api/v1";
// export const BASE_URL = "http://localhost:8080/api/v1";
export const CLOUDINARY_CLOUD_NAME = "dwnftgpia";
export const API_ENDPOINTS = {
    ACTIVATE_ACCOUNTS: (activationToken) => `/profile/activate?activationToken=${activationToken}`,
    UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    LOGIN: "/profile/login",
    REGISTER: "/profile/register",

    GET_USER_PROFILE: "/profile",
    GET_ALL_CATEGORY: "/category",
    SAVE_CATEGORY: "/category",
    UPDATE_CATEGORY: (categoryId) => `/category/${categoryId}`,
    GET_CATEGORY_BY_TYPE: (type) => `/category/${type}`,

    DELETE_CATEGORY: (categoryId) => `/category/${categoryId}`,

    GET_ALL_INCOMES: "/incomes",
    ADD_INCOME: "/incomes"
}