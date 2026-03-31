// export const BASE_URL = "https://money-manager-backend-2w6b.onrender.com/api/v1";
export const BASE_URL = "http://localhost:8787/api/v1";
export const CLOUDINARY_CLOUD_NAME = "dwnftgpia";
export const API_ENDPOINTS = {
    LOGIN: "/profile/login",
    REGISTER: "/profile/register",
    GET_USER_PROFILE: "/profile",
    GET_ALL_CATEGORY: "/category",
    SAVE_CATEGORY: "/category",
    UPDATE_CATEGORY: (categoryId) => `/category/${categoryId}`,
    DELETE_CATEGORY: (categoryId) => `/category/${categoryId}`,

    GET_ALL_INCOMES:"/incomes",
    UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
}