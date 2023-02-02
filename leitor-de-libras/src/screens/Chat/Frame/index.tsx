import {
    View,
    ScrollView,
    FlatList,
    TouchableOpacity
} from "react-native";
import { Microphone, X } from "phosphor-react-native";

import Font from "../../../components/Font";
import Input from "../../../components/Input";
import { useLang } from "../../../contexts/lang";
import { useColors } from "../../../contexts/colors";

import createStyles from "./styles";

export default function Frame() {
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors });

    return (
        <View style={styles.container}>
            <ScrollView
                
            />
            <View>
                <View style={styles.suggestionContainer}>
                    <View style={styles.suggestionWrapper}>
                        <FlatList
                            data={["Olá!", "vasc", "boa noite", "bom dia", "legal", "doido"]}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity style={styles.suggestion} key={index}>
                                    <Font preset="text" style={styles.suggestionLabel}>{item}</Font>
                                </TouchableOpacity>
                            )}
                            contentContainerStyle={{ paddingLeft: 10 }}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                    <TouchableOpacity style={styles.suggestionClose}>
                        <X size={20} color={colors.font} />
                    </TouchableOpacity>
                </View>
                <View style={styles.controls}>
                    <Input
                        placeholder={lang.conversations.chat.placeholder}
                        containerStyle={{ flex: 1, paddingBottom: 0 }}
                        style={styles.input}
                    />
                    <TouchableOpacity
                        style={styles.speak}
                    >
                        <Microphone color={colors.font2} size={18} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
