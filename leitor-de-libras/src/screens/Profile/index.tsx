import { useState } from "react";
import {
    View
} from "react-native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useColors } from "../../contexts/Colors";

import createStyles from "./styles";
import Input from "../../components/Input";

interface ProfileProps {
    navigation: BottomTabNavigationProp<RootStackParamList, "Profile">;
}

export default function Profile({  }: ProfileProps) {
    const colors = useColors();
    const styles = createStyles({ colors });

    const [test, setTest] = useState("");

    return (
        <View style={styles.container}>
            <Input label="Caguei no vasco" placeholder="Bolsonaro no vasco" value={test} onChangeText={t => setTest(t)} onRequestClear={() => setTest("")} />
        </View>
    );
}
