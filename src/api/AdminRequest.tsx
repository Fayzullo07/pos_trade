import axios from "axios";
const URL = process.env.NEXT_PUBLIC_BACKEND_API;
const API = axios.create({ baseURL: URL });
console.log(URL);


// const config = {
//   headers: {
//     Authorization: "Bearer " + JSON.parse(localStorage.getItem("user"))?.access,
//   },
// };

// -----------------------------------------ADMIN CATEGORY-----------------------------
// GET
export const categoryGetAPI = async () =>
    API.get(`/admin/category`);

// POST
export const categoryPostAPI = async (data: any) =>
    API.post(`/admin/category`, data);

// PUT
export const categoryPutAPI = async (data: any, id: any) =>
    API.put(`/admin/category/${id}/`, data);

// DELETE
export const categoryDeleteAPI = async ({ id }: { id: any }) =>
    API.delete(`/admin/category/${id}/`);

// GET BY ID
export const categoryGetOneAPI = async ({ id }: { id: any }) =>
    API.get(`/admin/category/${id}/`);


// -----------------------------------------ADMIN PRODUCT-----------------------------

// GET
export const ordersAdminGetAPI = async () =>
    API.get(`/admin/orders`);


// GET
export const productGetAPI = async () =>
    API.get(`/admin/product`);

// POST
export const productPostAPI = async (data: any) =>
    API.post(`/admin/product`, data);

// PUT
export const productPutAPI = async (data: any, id: any) =>
    API.put(`/admin/product/${id}/`, data);

// DELETE
export const productDeleteAPI = async ({ id }: { id: any }) =>
    API.delete(`/admin/product/${id}/`);

// GET BY ID
export const productGetOneAPI = async ({ id }: { id: any }) =>
    API.get(`/admin/product/${id}/`);

// -----------------------------------------ORDER PRODUCT-----------------------------
// GET
export const productOrderGetAPI = async ({ category }: { category: String }) =>
    API.get(`/menu/product/?category=${category}`);

// -----------------------------------------ORDER CATEGORY-----------------------------
// GET
export const categoryOrderGetAPI = async () =>
    API.get(`/menu/category`);

// -----------------------------------------ORDER -----------------------------
// POST
export const orderPostAPI = async (data: any) =>
    API.post(`/menu`, data);


// -----------------------------------------CHEF-----------------------------
// GET
export const chefGetAPI = async () =>
    API.get(`/chef`);

// PATCH
export const chefPatchAPI = async (data: any, id: any) =>
    API.patch(`/chef/${id}/`, data);

// -----------------------------------------ORDER NUMBERS-----------------------------
// GET
export const orderNumbersGetAPI = async () =>
    API.get(`/order_numbers`);

