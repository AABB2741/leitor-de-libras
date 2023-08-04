import { StyleSheet } from "react-native";
import { ImageConfirm } from ".";
import { ThemeProps } from "../../../theme/getTheme";
import Constants from "expo-constants";

interface ImageConfirmStyle {
	colors: ThemeProps;
}

export default ({ colors }: ImageConfirmStyle) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colors.background,
			paddingTop: Constants.statusBarHeight,
		},
		content: {
			flex: 1,
			padding: 20,
			justifyContent: "space-between",
		},
		upload: {
			flex: 1,
			justifyContent: "center",
			padding: 20,
		},
		title: {
			textAlign: "center",
			marginBottom: 10,
			fontSize: 20,
			flex: 1,
		},
		image: {
			resizeMode: "contain",
			flex: 2,
			width: "100%",
			borderRadius: 16,
			aspectRatio: 1,
		},
		options: {
			flex: 1,
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "flex-end",
		},
		mediaSentTitle: {
			fontSize: 20,
			textAlign: "center",
		},
		sentIcon: {
			alignItems: "center",
		},
		text: {
			textAlign: "center",
		},
		error: {
			color: colors.critic,
			textAlign: "center",
			marginTop: 10,
		},
	});
