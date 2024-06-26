import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import {
	ArrowRight,
	ArrowSquareOut,
	Heart,
	ShareNetwork,
	Shuffle,
} from "phosphor-react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Font from "../../../components/Font";
import { useColors } from "../../../contexts/colors";
import { useLang } from "../../../contexts/lang";

import getCuriosity from "../../../constants/curiosities";

import createStyles from "./styles";

interface TipsProps {
	navigation: NativeStackNavigationProp<DashboardParamList, "Dashboard">;
}

export default function Tips({ navigation }: TipsProps) {
	const lang = useLang();
	const colors = useColors();
	const styles = createStyles({ colors });

	const [curiosity, setCuriosity] = useState(getCuriosity());

	return (
		<View style={styles.container}>
			<View>
				<Font family="medium" style={styles.content}>
					{lang.dashboard.tips[curiosity.type]}{" "}
					<Font>{lang.dashboard.tips[curiosity.id].short}</Font>
				</Font>
			</View>
			<View style={styles.options}>
				<View style={styles.buttons}>
					<TouchableOpacity
						style={styles.button}
						onPress={() => setCuriosity(getCuriosity())}
					>
						<Shuffle size={24} color={colors.font} />
					</TouchableOpacity>
				</View>
				<TouchableOpacity
					style={styles.visit}
					onPress={() =>
						navigation.navigate("Article", { id: curiosity.id })
					}
				>
					<Font family="ubuntu" style={styles.visitLabel}>
						{lang.dashboard.tips.learn_more}
					</Font>
					<ArrowRight size={16} color={colors.accent} />
				</TouchableOpacity>
			</View>
		</View>
	);
}
