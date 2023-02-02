import {
    View,
    ScrollView,
    FlatList,
    TouchableOpacity
} from "react-native";
import {
    useEffect,
    useState
} from "react";
import { Microphone, PaperPlane, PaperPlaneRight, X } from "phosphor-react-native";

import Font from "../../../components/Font";
import Input from "../../../components/Input";
import { useLang } from "../../../contexts/lang";
import { useColors } from "../../../contexts/colors";
import SUGGESTIONS, { SuggestionProps } from "../../../constants/suggestions";

import createStyles from "./styles";

interface FrameProps {
    messages: Msg[];
    guest?: boolean;
    keyboardOpen?: boolean;
    handleSendMessage: ({ message, from }: Omit<Omit<Msg, "chatId">, "date">) => void;
}

export default function Frame({ messages, guest, keyboardOpen, handleSendMessage }: FrameProps) {
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors, guest });

    const [msg, setMsg] = useState("");
    const [suggestions, setSuggestions] = useState<SuggestionProps[]>([]);

    useEffect(() => {
        if (!messages.length && !guest) {
            setSuggestions(SUGGESTIONS.filter(s => s.initial))
        }
    }, [messages])

    if (keyboardOpen && guest)
        return null;
    console.log(messages);
    return (
        <View style={styles.container}>
            <ScrollView
                
            />
            <View>
                <View style={styles.suggestionContainer}>
                    <View style={styles.suggestionWrapper}>
                        <FlatList
                            data={suggestions}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity style={styles.suggestion} onPress={() => handleSendMessage({ message: item.msg, from: guest ? "guest" : "owner" })} onLongPress={() => setMsg(item.msg)} key={index}>
                                    <Font preset="text" style={styles.suggestionLabel}>{item.shortMsg ?? item.msg}</Font>
                                </TouchableOpacity>
                            )}
                            contentContainerStyle={{ paddingLeft: 10 }}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                    {!!suggestions.length && (
                        <TouchableOpacity style={styles.suggestionClose}>
                            <X size={20} color={colors.font} />
                        </TouchableOpacity>
                    )}
                </View>
                <View style={styles.controls}>
                    <Input
                        placeholder={lang.conversations.chat.placeholder}
                        containerStyle={{ flex: 1, paddingBottom: 0 }}
                        style={styles.input}
                        value={msg}
                        onChangeText={msg => setMsg(msg)}
                        focusable={!guest}
                    />
                    <TouchableOpacity style={styles.action} onPress={msg ? () => handleSendMessage({ message: msg, from: guest ? "guest" : "owner" }) : () => null}>
                        {msg && <PaperPlaneRight color={colors.font2} size={18} />}
                        {!msg && <Microphone color={colors.font2} size={18} />}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
