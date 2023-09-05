import {
	ClipboardText,
	DownloadSimple,
	IconProps,
	Info,
	PencilSimple,
	ShareNetwork,
	SpeakerHigh,
} from "phosphor-react-native";
import { useEffect, useState } from "react";
import * as Tts from "../services/Tts";

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
	hasContent: boolean;
	content?: string;
}

export type UploadedFile = FileProps & { uploaded?: boolean };

export function useWatchOptions({
	data,
	setDetailsVisible,
	hasContent,
	content,
}: IWatchOptions) {
	const [options, setOptions] = useState<WatchOptionProps[]>([]);
	const [speaking, setSpeaking] = useState(false);
	console.log("Conteúdo " + content);
	const lang = useLang();

	function handleSpeak() {
		if (!content || speaking) return;

		setSpeaking(true);

		Tts.speak(content, {
			onStart: () => setSpeaking(true),
			onDone: () => setSpeaking(false),
			onStopped: () => setSpeaking(false),
		});
	}

	function handleStopSpeaking() {
		if (!content || !speaking) return;

		setSpeaking(false);
		Tts.stop();
	}

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
				checkVisibility: () => !!hasContent,
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
			{
				label: speaking ? "Parar de falar" : "Falar em voz alta",
				icon: (props) => <SpeakerHigh {...props} />,
				onPress: speaking ? handleStopSpeaking : handleSpeak,
				checkVisibility: () => !!content,
			},
		]);
	}, [content]);

	return { options, setOptions };
}
