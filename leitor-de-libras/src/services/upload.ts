import * as SecureStore from "expo-secure-store";

import { api } from "../lib/api";
import { FileProps } from "../screens/Translations/File";
import * as Storage from "./Storage";

import AppError from "../errors/AppError";

interface UploadProps {
	uri: string;
	id: string;
}

export async function uploadImage({
	uri,
	id,
}: UploadProps): Promise<FileProps> {
	const authorization = await SecureStore.getItemAsync("token");

	const imageData = new FormData();
	imageData.append("file", {
		name: `image.jpg`,
		type: "image/jpeg",
		uri,
	} as any);

	const uploadResponse = await api.post<FileProps>(
		"/upload/image",
		imageData,
		{
			headers: {
				authorization,
				"Content-Type": "multipart/form-data",
			},
		}
	);

	if (uploadResponse.status === 201 || uploadResponse.status === 200) {
		const data = await Storage.findItem("translations", (f) => f.id === id);

		const updateResponse = await api.put<FileProps>(
			"/translations/edit/" + uploadResponse.data.id,
			data,
			{
				headers: {
					authorization,
				},
			}
		);

		await Storage.updateItem(
			"translations",
			(f) => f.id === id,
			updateResponse.data
		); // Atualizando arquivo local

		return updateResponse.data;
	} else throw new AppError("unknown_err");
}

export async function uploadVideo({ uri, id }: UploadProps) {
	const authorization = await SecureStore.getItemAsync("token");

	const videoData = new FormData();
	videoData.append("file", {
		name: "video.mp4",
		type: "video/mp4",
		uri,
	} as any);

	const uploadResponse = await api.post<FileProps>(
		"/upload/video",
		videoData,
		{
			headers: {
				authorization,
				"Content-Type": "multipart/form-data",
			},
		}
	);

	let response = uploadResponse.data;
	if (uploadResponse.status === 200 || uploadResponse.status === 201) {
		const data = await Storage.findItem("translations", (f) => f.id === id);

		const updateResponse = await api.put<FileProps>(
			"/translations/edit/" + uploadResponse.data.id,
			{
				data,
			},
			{
				headers: {
					authorization,
				},
			}
		);

		response = updateResponse.data;
	}

	const res = await Storage.updateItem(
		"translations",
		(f) => f.id === id,
		response
	);

	return res;
}
