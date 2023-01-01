import {
    View
} from "react-native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useColors } from "../../contexts/Colors";

import createStyles from "./styles";

interface ProfileProps {
    navigation: BottomTabNavigationProp<RootStackParamList, "Profile">;
}

export default function Profile({  }: ProfileProps) {
    const colors = useColors();
    const styles = createStyles({ colors });

    return (
        <View style={styles.container}></View>
    );
}
