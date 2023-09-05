import axios from "axios";

export const api = axios.create({
	baseURL: "http://192.168.112.16:8000",
	timeout: 15000,
});
