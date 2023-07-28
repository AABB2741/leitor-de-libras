import { StyleSheet } from "react-native";
import { ThemeProps } from "../../../theme/getTheme";
import Constants from "expo-constants";

interface VideoConfirmStyle {
	colors: ThemeProps;
}

export default ({ colors }: VideoConfirmStyle) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colors.background,
			padding: 20,
		},
		video: {
			flex: 1,
			position: "absolute",
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
		},
		title: {
			fontSize: 16,
		},
		options: {
			marginTop: 10,
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
		},
		optionLabel: {
			color: colors.font2,
		},
		text: {
			textAlign: "center",
		},
		upload: {
			flex: 1,
			justifyContent: "center",
			padding: 20,
		},
	});
