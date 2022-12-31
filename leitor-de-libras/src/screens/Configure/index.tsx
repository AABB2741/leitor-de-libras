import {
    View
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useColors } from "../../contexts/Colors";

import createStyles from "./styles";
import { RouteProp } from "@react-navigation/native";

interface Props {
    navigation: NativeStackNavigationProp<DashboardParamList, "Configure">;
    route: RouteProp<DashboardParamList, "Configure">;
}

export default function Configure({ navigation, route }: Props) {
    const colors = useColors();
    const styles = createStyles({ colors });

    return (
        <View style={styles.container}>

        </View>
    )
}
