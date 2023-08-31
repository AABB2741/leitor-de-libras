import { useEffect } from "react";
import { View } from "react-native";

import { useColors } from "../../contexts/colors";

import createStyles from "./styles";
import Font from "../../components/Font";

export default function Customize() {
	const colors = useColors();
	const styles = createStyles({ colors });

	return (
		<View style={styles.container}>
			<Font>Tela com infos médicas</Font>
		</View>
	);
}
