import { TouchableOpacity, View } from "react-native";
import Font from "../../../components/Font";
import { useColors } from "../../../contexts/Colors";
import createStyles from "./styles";

import { Category } from "../../../constants/settingsList";
import { CaretRight } from "phosphor-react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface ConfigSectionProps extends Category {
    navigation: NativeStackNavigationProp<DashboardParamList, "Settings">;
}

export default function ConfigSection({ navigation, category, title, settings }: ConfigSectionProps) {
    const colors = useColors();
    const styles = createStyles({ colors });
    
    return (
        <View style={styles.container}>
            <Font preset="subtitle" numberOfLines={1}>{title}</Font>
            <View style={styles.configs}>
                {settings.map(({ icon, location, title, desc }, index) => (
                    <TouchableOpacity style={styles.config} onPress={() => navigation.navigate("Configure", { category, location })} key={index}>
                        {icon({ color: colors.font, size: 24 })}
                        <View style={styles.configInfos}>
                            <Font preset="button" numberOfLines={1}>{title}</Font>
                            {desc && <Font preset="desc" style={styles.configDesc} numberOfLines={1}>{desc}</Font>}
                        </View>
                        <CaretRight color={colors.font} size={12} />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}
