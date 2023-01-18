import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
    View
} from "react-native";
import { useColors } from "../../contexts/colors";

import createStyles from "./styles";

interface LearnProps {
    navigation: BottomTabNavigationProp<AppScreens, "Learn">;
}

export default function Profile({  }: LearnProps) {
    const colors = useColors();
    const styles = createStyles({ colors });

    return (
        <View style={styles.container}>

        </View>
    );
}
