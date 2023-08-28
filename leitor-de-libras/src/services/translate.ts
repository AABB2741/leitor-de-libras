import * as SecureStore from "expo-secure-store";
import { api } from "../lib/api";

export default async function translate(id: string) {
	const authorization = await SecureStore.getItemAsync("token");

	const response = await api.get("/translations/translate/" + id, {
		headers: {
			authorization,
		},
	});

	console.log(response.data);
}
