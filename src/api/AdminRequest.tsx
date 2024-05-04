import axios from "axios";
const URL = process.env.BACKEND_API;
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
    API.get(`/api/admin/category`);

// POST
export const categoryPostAPI = async (data: any) =>
    API.post(`/api/admin/category`, data);

// PUT
export const categoryPutAPI = async (data: any, id: any) =>
    API.put(`/api/admin/category/${id}/`, data);

// DELETE
export const categoryDeleteAPI = async ({ id }: { id: any }) =>
    API.delete(`/api/admin/category/${id}/`);

// GET BY ID
export const categoryGetOneAPI = async ({ id }: { id: any }) =>
    API.get(`/api/admin/category/${id}/`);


// -----------------------------------------ADMIN PRODUCT-----------------------------

// GET
export const productGetAPI = async () =>
    API.get(`/api/admin/product`);

// POST
export const productPostAPI = async (data: any) =>
    API.post(`/api/admin/product`, data);

// PUT
export const productPutAPI = async (data: any, id: any) =>
    API.put(`/api/admin/product/${id}/`, data);

// DELETE
export const productDeleteAPI = async ({ id }: { id: any }) =>
    API.delete(`/api/admin/product/${id}/`);

// GET BY ID
export const productGetOneAPI = async ({ id }: { id: any }) =>
    API.get(`/api/admin/product/${id}/`);

// -----------------------------------------ORDER PRODUCT-----------------------------
// GET
export const productOrderGetAPI = async ({ category }: { category: String }) =>
    API.get(`/api/order/product/?category=${category}`);

// -----------------------------------------ORDER CATEGORY-----------------------------
// GET
export const categoryOrderGetAPI = async () =>
    API.get(`/api/order/category`);

// -----------------------------------------ORDER -----------------------------
// POST
export const orderPostAPI = async (data: any) =>
    API.post(`/api/order`, data);


// -----------------------------------------CHEF-----------------------------
// GET
export const chefGetAPI = async () =>
    API.get(`/api/chef`);

// PATCH
export const chefPatchAPI = async (data: any, id: any) =>
    API.patch(`/api/chef/${id}/`, data);

// -----------------------------------------ORDER NUMBERS-----------------------------
// GET
export const orderNumbersGetAPI = async () =>
    API.get(`/api/order_numbers`);

