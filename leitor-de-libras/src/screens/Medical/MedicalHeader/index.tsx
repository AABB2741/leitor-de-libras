import { ArrowLeft } from "phosphor-react-native";
import { TouchableOpacity, View } from "react-native";
import { useColors } from "../../../contexts/colors";
import { useUser } from "../../../contexts/user";

import Font from "../../../components/Font";
import Avatar from "../../../components/Avatar";

import { createStyles } from "./styles";

export function MedicalHeader() {
	const colors = useColors();

	const styles = createStyles({ colors });

	const { user } = useUser();

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.headerOptions}>
				<ArrowLeft color={colors.font2} />
			</TouchableOpacity>
			<View style={styles.headerTitle}>
				<Font style={styles.title}>Informações médicas</Font>
			</View>
			<View style={styles.headerProfile}>
				<Avatar style={styles.avatar} />
			</View>
		</View>
	);
}
