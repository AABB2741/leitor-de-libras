import {
	View,
	Image,
	ImageSourcePropType,
	TouchableOpacity,
} from "react-native";
import {
	Archive,
	ArrowsClockwise,
	CheckCircle,
	Cloud,
	DeviceMobileCamera,
	Disc,
	DownloadSimple,
	Keyhole,
	Star,
} from "phosphor-react-native";
import * as Animatable from "react-native-animatable";

import { useColors } from "../../../contexts/colors";
import { useLang } from "../../../contexts/lang";
import { useSettings } from "../../../contexts/settings";

import Font from "../../../components/Font";

import moment from "moment";

import createStyles from "./styles";

import { LangProps } from "../../../lang/getLang";
import { ThemeProps } from "../../../theme/getTheme";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { api } from "../../../lib/api";

type FileState = "downloading" | "synching" | "localStorage" | "cloud";

export interface FileProps {
	id: string;
	archived?: boolean;
	authorId?: string;
	createdAt: Date;
	updatedAt: Date;
	deleted?: boolean;
	favorited?: boolean;
	imageName: string;
	password?: string;
	title: string;
	location: string;
	type: "i" | "v";
	content?: string; // O texto traduzido
}

interface Props extends FileProps {
	index: number;
	selectedFiles: string[];
	disabled: boolean;
	uploaded?: boolean; // Verifica se o arquivo está no servidor
	handleSelectFile: (id: string) => void;
}

export default function File({
	id,
	imageName,
	title,
	createdAt,
	selectedFiles,
	index,
	handleSelectFile,
	uploaded,
	location,
	disabled,
}: Props) {
	const { settings } = useSettings();
	const lang = useLang();
	const colors = useColors();
	const styles = createStyles({ colors });

	const navigation =
		useNavigation<NativeStackNavigationProp<TranslationsParamList>>();

	const selected = selectedFiles.includes(id);

	moment.updateLocale(lang.locale, {
		relativeTime: {
			...lang.general.unity,
		},
	});

	const imageUrl = `${api.getUri()}/uploads/${imageName}`;

	return (
		<TouchableOpacity
			style={[styles.container, disabled && styles.disabled]}
			onPress={
				selectedFiles.length
					? () => handleSelectFile(id)
					: () => navigation.navigate("Watch", { id })
			}
			onLongPress={() => handleSelectFile(id)}
			disabled={disabled}
		>
			<Animatable.View
				style={{ flex: 1 }}
				animation={
					settings.display.performance.reduce_animations
						? undefined
						: "fadeInUp"
				}
				delay={index * 50}
			>
				<View
					style={[styles.indicators, selected && { display: "none" }]}
				>
					{/* {getStateIcon({ state, colors, lang })} */}
					<View style={styles.props}>
						{uploaded && (
							<Cloud
								color={colors.desc}
								size={14}
								style={{ marginLeft: 5 }}
							/>
						)}
						{location && (
							<Disc
								color={colors.desc}
								size={14}
								style={{ marginLeft: 5 }}
							/>
						)}
						{/* {locked && !disabled && (
							<Keyhole
								color={colors.desc}
								size={14}
								weight="fill"
								style={{ marginLeft: 5 }}
							/>
						)}
						{archived && !disabled && (
							<Archive
								color={colors.desc}
								size={14}
								weight="fill"
								style={{ marginLeft: 5 }}
							/>
						)}
						{favorited && !disabled && (
							<Star
								color={colors.desc}
								size={14}
								weight="fill"
								style={{ marginLeft: 5 }}
							/>
						)} */}
					</View>
				</View>
				<View
					style={[
						styles.indicators,
						!selected && { display: "none" },
					]}
				>
					<CheckCircle
						color={selected ? colors.accent : colors.font}
						weight={selected ? "fill" : "regular"}
						size={14}
					/>
				</View>
				<Image
					style={styles.thumbnail}
					source={{ uri: uploaded ? imageUrl : location }}
				/>
				<Font style={styles.title} numberOfLines={1}>
					{title}
				</Font>
				<Font style={styles.date} numberOfLines={1}>{`15min ∙ ${moment(
					createdAt
				).fromNow()}`}</Font>
			</Animatable.View>
		</TouchableOpacity>
	);
}

interface GetIconProps {
	state: FileState;
	colors: ThemeProps;
	lang: LangProps;
}

function getStateIcon({ state, colors, lang }: GetIconProps) {
	switch (state) {
		case "localStorage":
			return (
				<DeviceMobileCamera
					color={colors.desc}
					size={14}
					style={{ transform: [{ rotate: "180deg" }] }}
				/>
			);
		case "cloud":
			return <Cloud color={colors.desc} size={14} />;
		case "downloading":
			return (
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						flex: 1,
					}}
				>
					<DownloadSimple color={colors.desc3} size={14} />
					<Font
						style={{
							fontSize: 10,
							color: colors.desc3,
							marginLeft: 5,
							flex: 1,
						}}
						numberOfLines={1}
					>
						{lang.translations.file.downloading}
					</Font>
				</View>
			);
		case "synching":
			return (
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						flex: 1,
					}}
				>
					<ArrowsClockwise color={colors.desc3} size={14} />
					<Font
						style={{
							fontSize: 10,
							color: colors.desc3,
							marginLeft: 5,
							flex: 1,
						}}
						numberOfLines={1}
					>
						{lang.translations.file.synching}
					</Font>
				</View>
			);
	}
}
