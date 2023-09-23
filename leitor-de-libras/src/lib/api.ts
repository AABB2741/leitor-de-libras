import axios from "axios";

export const api = axios.create({
	baseURL: "http://100.112.101.208:8000",
	timeout: 15000,
});
