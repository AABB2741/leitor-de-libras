import { TouchableOpacity } from "react-native";
import { IconProps } from "phosphor-react-native";

import createStyles from "./styles";
import { useColors } from "../../../contexts/colors";

import Font from "../../../components/Font";

export interface OptionProps {
	icon: ({ color, size }: IconProps) => React.ReactNode;
	label: string;

	checkVisibility?: () => boolean;
	onPress?: () => void;
}

interface Props extends OptionProps {
	selectCount: number;
}

export default function Option({
	icon,
	label,
	selectCount,
	checkVisibility,
	onPress,
}: Props) {
	const colors = useColors();
	const styles = createStyles({ colors });

	if (!checkVisibility?.()) return null;

	return (
		<TouchableOpacity style={styles.container} onPress={onPress}>
			{icon({ color: colors.font, size: 16 })}
			<Font family="ubuntu" style={styles.label}>
				{label}
			</Font>
		</TouchableOpacity>
	);
}
