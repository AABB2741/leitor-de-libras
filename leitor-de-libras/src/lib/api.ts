import axios from "axios";

export const api = axios.create({
    baseURL: "http://143.106.8.72:8000"
});
