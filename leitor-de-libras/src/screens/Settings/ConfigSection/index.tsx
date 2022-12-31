import { TouchableOpacity, View } from "react-native";
import Font from "../../../components/Font";
import { useColors } from "../../../contexts/Colors";
import createStyles from "./styles";

import { Category } from "../../../constants/settingsList";
import { CaretRight } from "phosphor-react-native";

interface Props extends Category {

}

export default function ConfigSection({ title, settings }: Props) {
    const colors = useColors();
    const styles = createStyles({ colors });
    console.log(settings);

    return (
        <View style={styles.container}>
            <Font preset="subtitle" numberOfLines={1}>{title}</Font>
            <View style={styles.configs}>
                {settings.map(({ icon, title, desc }, index) => (
                    <TouchableOpacity style={styles.config} key={index}>
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
