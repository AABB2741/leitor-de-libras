import {
	ClipboardText,
	DownloadSimple,
	IconProps,
	Info,
	PencilSimple,
	ShareNetwork,
} from "phosphor-react-native";
import { useEffect, useState } from "react";

import { useLang } from "../contexts/lang";

import { FileProps } from "../screens/Translations/File";

interface WatchOptionProps {
	icon: (props: IconProps) => JSX.Element;
	label: string;
	onPress?: () => void;
	checkVisibility?: () => boolean;
}

interface IWatchOptions {
	data: null | UploadedFile;
	setDetailsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export type UploadedFile = FileProps & { uploaded?: boolean };

export function useWatchOptions({ data, setDetailsVisible }: IWatchOptions) {
	const [options, setOptions] = useState<WatchOptionProps[]>([]);

	const lang = useLang();

	useEffect(() => {
		setOptions([
			{
				label: lang.watch.options.share,
				icon: (props: IconProps) => <ShareNetwork {...props} />,
				checkVisibility: () => !!data?.uploaded,
			},
			{
				label: lang.watch.options.edit,
				icon: (props: IconProps) => <PencilSimple {...props} />,
				checkVisibility: () => true,
			},
			{
				label: lang.watch.options.copy,
				icon: (props: IconProps) => <ClipboardText {...props} />,
				checkVisibility: () => true,
			},
			{
				label: lang.watch.options.details,
				icon: (props: IconProps) => <Info {...props} />,
				checkVisibility: () => true,
				onPress: () => setDetailsVisible(true),
			},
			{
				label: lang.watch.options.download,
				icon: (props) => <DownloadSimple {...props} />,
			},
		]);
	}, []);

	return { options, setOptions };
}
