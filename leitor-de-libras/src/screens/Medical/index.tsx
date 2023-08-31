import { useEffect } from "react";
import { ScrollView, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { useColors } from "../../contexts/colors";

import createStyles from "./styles";
import Font from "../../components/Font";

import { MedicalBackground } from "./MedicalBackground";

export default function Customize() {
	const colors = useColors();
	const styles = createStyles({ colors });

	return (
		<ScrollView style={styles.container}>
			<StatusBar style="light" />
			<MedicalBackground />
			<Font>Tela com infos médicas</Font>
		</ScrollView>
	);
}
