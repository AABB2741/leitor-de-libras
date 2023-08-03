import axios from "axios";

export const ai = axios.create({
	baseURL: "http://127.0.0.1:3333/",
});
