import axios from "axios";

export const api = axios.create({
	baseURL: "http://192.168.0.179:8000",
	timeout: 15000,
});
