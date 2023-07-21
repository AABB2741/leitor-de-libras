import axios from "axios";

export const api = axios.create({
    baseURL: "http://192.168.96.66:8000"
});
