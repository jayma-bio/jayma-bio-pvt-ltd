import axios from "axios";

export const axiosinstance = axios.create({
    baseURL: "https://apiv2.shiprocket.in/v1/external",
});