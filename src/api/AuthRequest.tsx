import axios from "axios";
const URL = process.env.BACKEND_API;
const API = axios.create({});


// const config = {
//   headers: {
//     Authorization: "Bearer " + JSON.parse(localStorage.getItem("user"))?.access,
//   },
// };

// -----------------------------------------AUTH-----------------------------

// POST
export const registerPostAPI = async (data: any) =>
    API.post(`/api/register`, data);

// POST
export const userExistPostAPI = async (data: any) =>
    API.post(`/api/userExists`, data);
