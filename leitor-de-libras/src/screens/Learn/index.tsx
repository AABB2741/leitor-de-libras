import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
    View
} from "react-native";
import { useColors } from "../../contexts/Colors";

import createStyles from "./styles";

interface LearnProps {
    navigation: BottomTabNavigationProp<RootStackParamList, "Learn">;
}

export default function Profile({  }: LearnProps) {
    const colors = useColors();
    const styles = createStyles({ colors });

    return (
        <View style={styles.container}>

        </View>
    );
}
