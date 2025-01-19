import axios from "axios";
// import '../../envConfig.ts';
// console.log('process.env.SERVER_URL ', process.env.SERVER_URL)

export const axiosApiClient = axios.create({
  baseURL: process.env.SERVER_URL,
  // baseURL: "http://localhost:8000/",
});
