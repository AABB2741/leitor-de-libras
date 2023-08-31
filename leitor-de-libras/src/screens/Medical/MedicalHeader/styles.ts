import { StyleSheet } from "react-native";
import { ThemeProps } from "../../../theme/getTheme";
import Constants from "expo-constants";

interface MedicalHeaderStyle {
	colors: ThemeProps;
}

export const createStyles = ({ colors }: MedicalHeaderStyle) =>
	StyleSheet.create({
		container: {
			paddingTop: Constants.statusBarHeight + 20,
			paddingHorizontal: 20,
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
		},
		headerOptions: {
			flex: 1,
		},
		headerTitle: {
			flex: 4,
		},
		title: {
			color: colors.font2,
			textAlign: "center",
		},
		headerProfile: {
			flex: 1,
			alignItems: "flex-end",
		},
		avatar: {
			width: 30,
			height: 30,
			resizeMode: "cover",
			borderRadius: 15,
			borderWidth: 2,
			borderColor: colors.font2,
		},
	});
