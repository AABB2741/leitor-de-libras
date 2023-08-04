import { StyleSheet } from "react-native";

import { ThemeProps } from "../../theme/getTheme";

interface CameraStyle {
	colors: ThemeProps;
}

export default ({ colors }: CameraStyle) =>
	StyleSheet.create({
		loading: {
			flex: 1,
			backgroundColor: colors.background,
			justifyContent: "center",
			alignItems: "center",
		},
		container: {
			flex: 1,
		},
		content: {
			backgroundColor: "#000",
			alignItems: "center",
			justifyContent: "center",
		},
		camera: {
			width: "100%",
			position: "absolute",
			aspectRatio: 1,
		},
		overlay: {
			height: "100%",
			width: "100%",
			flexDirection: "column",
			justifyContent: "space-between",
			zIndex: 1,
		},
		top: {
			paddingTop: 10,
			paddingBottom: 10,
			paddingHorizontal: 20,
			backgroundColor: "rgba(0, 0, 0, 0.75)",
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
		},
		mode: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "center",
			marginBottom: 15,
		},
		bottom: {
			padding: 20,
			paddingTop: 10,
			backgroundColor: "rgba(0, 0, 0, 0.75)",
		},
		options: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "center",
		},
		record: {
			backgroundColor: colors.accent,
			padding: 15,
			borderRadius: 100,
			marginHorizontal: 50,
		},
	});
