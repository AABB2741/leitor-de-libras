import * as SecureStore from "expo-secure-store";
import * as Storage from "./Storage";
import { api } from "../lib/api";

import { UploadedFile } from "../hooks/useWatchOptions";
import { FileProps } from "../screens/Translations/File";
import AppError from "../errors/AppError";

export default async function translate(id: string): Promise<UploadedFile> {
	const authorization = await SecureStore.getItemAsync("token");

	const response = await api.get<UploadedFile>(
		"/translations/translate/" + id,
		{
			headers: {
				authorization,
			},
		}
	);
	const res: FileProps | null = await Storage.updateItem(
		"translations",
		(t) => t.id === id,
		response.data
	);

	if (!res) throw new AppError("unknown_err");

	return { ...res, uploaded: true };
}
