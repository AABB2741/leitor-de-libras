import { StyleSheet } from "react-native";
import { ThemeProps } from "../../theme/getTheme";

interface WatchStyle {
	colors: ThemeProps;
}

export default ({ colors }: WatchStyle) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colors.background,
		},
		outOfSyncIcon: {
			alignSelf: "center",
			marginBottom: 5,
		},
		outOfSyncText: {
			textAlign: "center",
			marginVertical: 5,
		},
		outOfSyncOptions: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "center",
			marginVertical: 10,
		},
		outOfSyncOptionIcon: {
			width: 54,
			height: 54,
		},
		outOfSyncOptionText: {
			textAlign: "center",
			marginTop: 5,
		},
		outOfSyncOption: {
			alignItems: "center",
			paddingHorizontal: 20,
			marginHorizontal: 5,
		},
		outOfSyncOptionBorder: {
			borderLeftWidth: 1,
			borderLeftColor: colors.border,
		},
		fullScreen: {
			flex: 1,
			height: "100%",
			width: "100%",
			resizeMode: "contain",
			backgroundColor: colors.background,
		},
		loading: {
			alignItems: "center",
			justifyContent: "center",
			paddingHorizontal: 20,
		},
		image: {
			width: "100%",
			height: "100%",
			resizeMode: "contain",
		},
		video: {
			backgroundColor: colors.background2,
			flex: 1,
			maxHeight: 200,
		},
		scroll: {
			flex: 1,
		},
		title: {
			padding: 20,
			fontSize: 18,
		},
		options: {
			paddingLeft: 20,
			paddingRight: 10,
		},
		option: {
			paddingHorizontal: 15,
			paddingVertical: 7,
			backgroundColor: colors.background2,
			borderRadius: 50,
			flexDirection: "row",
			alignItems: "center",
			marginRight: 10,
		},
		optionLabel: {
			marginLeft: 5,
			fontSize: 12,
		},
		text: {
			fontSize: 14,
			lineHeight: 20,
		},
		wordContainer: {
			justifyContent: "center",
			alignItems: "center",
			padding: 20,
		},
		wordWrapper: {
			padding: 20,
			backgroundColor: colors.background2,
			borderBottomWidth: 5,
			borderBottomColor: "red",
			borderRadius: 12,
			width: "100%",
			justifyContent: "center",
			overflow: "hidden",
		},
		word: {
			textAlign: "center",
			fontSize: 28,
		},
		detailsHeader: {
			flexDirection: "row",
			alignItems: "center",
		},
		detailsPreview: {
			height: 65,
			width: 100,
			borderRadius: 12,
		},
		detailsTitle: {
			flex: 1,
			paddingLeft: 20,
			fontSize: 16,
		},
		detailsBody: {
			flexDirection: "row",
			alignItems: "flex-start",
			paddingVertical: 10,
		},
		detailsColumn: {
			flex: 1,
		},
		detailsColumnLeft: {
			paddingRight: 20,
		},
		detailsCell: {
			marginBottom: 10,
		},
		detailsLabel: {
			color: colors.desc,
			fontSize: 11,
		},
		detailsValue: {
			fontSize: 14,
		},
	});
