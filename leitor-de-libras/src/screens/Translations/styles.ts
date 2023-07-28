import { StyleSheet } from "react-native";

import { ThemeProps } from "../../theme/getTheme";

interface TranslationsStyle {
	colors: ThemeProps;
}

export default ({ colors }: TranslationsStyle) =>
	StyleSheet.create({
		modalTitle: {},
		modalText: {
			marginVertical: 10,
		},
		deleteModalSummary: {
			backgroundColor: colors.background2,
			padding: 10,
			marginRight: 10,
			borderRadius: 12,
		},
		deleteModalCount: {
			textAlign: "center",
			fontSize: 24,
		},
		deleteModalItems: {
			fontSize: 10,
		},
		loading: {
			justifyContent: "center",
			alignItems: "center",
			flex: 1,
			backgroundColor: colors.background,
		},
		container: {
			flex: 1,
			backgroundColor: colors.background,
		},
		error: {
			justifyContent: "center",
			alignItems: "center",
			padding: 20,
		},
		selected: {
			backgroundColor: colors.header,
			paddingHorizontal: 20,
			paddingVertical: 10,
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
		},
		selection: {
			flex: 1,
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "flex-start",
		},
		selectedLabel: {
			fontSize: 13,
			color: colors.font,
			marginLeft: 10,
		},
		offlineWarning: {
			backgroundColor: colors.accent,
			paddingHorizontal: 20,
			paddingVertical: 10,
		},
		offlineWarningText: {
			color: colors.font2,
		},
		top: {
			padding: 20,
			paddingTop: 0,
			backgroundColor: colors.background,
		},
		optionsContainer: {
			flex: 1,
			backgroundColor: colors.background,
		},
		options: {
			padding: 20,
			paddingRight: 13,
			paddingBottom: 0,
		},
		files: {
			flex: 1,
			justifyContent: "flex-start",
			paddingHorizontal: 10,
		},
	});
