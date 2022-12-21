import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useColors } from "../../contexts/Colors";

import createStyles from "./styles";

interface Props {
    navigation: BottomTabNavigationProp<RootStackParamList, "Learn">;
}

export default function Profile({  }: Props) {
    const colors = useColors();
    const styles = createStyles({ colors });

    return null;
}