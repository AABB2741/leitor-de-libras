import { View } from "react-native";

import { MedicalHeader } from "../MedicalHeader";

import styles from "./styles";
import Font from "../../../components/Font";
import { useUser } from "../../../contexts/user";

export function MedicalBackground() {
	const { user } = useUser();

	return (
		<View style={styles.container}>
			<MedicalHeader />
			<View style={styles.content}>
				<Font family="black" style={styles.username}>
					{user.name}
				</Font>
			</View>
		</View>
	);
}
