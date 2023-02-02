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
import MsgBox from "../MsgBox";
import { useUser } from "../../../contexts/user";
import { useLang } from "../../../contexts/lang";
import { useColors } from "../../../contexts/colors";
import normalize from "../../../utils/normalize";
import SUGGESTIONS, { SuggestionProps } from "../../../constants/suggestions";

import createStyles from "./styles";

interface FrameProps {
    messages: Msg[];
    guest?: boolean;
    keyboardOpen?: boolean;
    handleSendMessage: ({ message, from }: Omit<Omit<Msg, "chatId">, "date">) => void;
}

function hasResponses(msg: string, responses: string[]) {
    for (let resp of responses) {
        if (normalize(msg, true).includes(normalize(resp, true))) {
            return true;
        }
    }

    console.log("N tem respostas")
    return false;
}

export default function Frame({ messages, guest, keyboardOpen, handleSendMessage }: FrameProps) {
    const { user, signed } = useUser();
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors, guest });

    const [msg, setMsg] = useState("");
    const [suggestions, setSuggestions] = useState<SuggestionProps[]>([]);

    useEffect(() => {
        if (!messages.length && !guest) {
            setSuggestions(SUGGESTIONS.filter(s => s.initial))
        }

        if (messages.length) {
            const lastMessage = messages[messages.length - 1];
            if (guest ? (lastMessage.from === "owner") : (lastMessage.from === "guest")) {
                setSuggestions(SUGGESTIONS.filter(s => hasResponses(lastMessage.message, s.respondsTo ?? [])));
            } else {
                setSuggestions([]);
            }
        }
    }, [messages])

    if (keyboardOpen && guest)
        return null;
    
    return (
        <View style={styles.container}>
            <FlatList
                data={[...messages].reverse()}
                inverted
                renderItem={({ item, index }) => (
                    <MsgBox {...item} key={index} />
                )}
                contentContainerStyle={{
                    paddingBottom: 20
                }}
                ListFooterComponent={(
                    <View style={styles.mode}>
                        <Font preset="text" style={styles.modeLabel}>{guest ? lang.conversations.chat.guest : (signed ? user?.name : lang.general.anonymous)}</Font>
                    </View>
                )}
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
                        onSubmitEditing={() => {
                            setMsg("");
                            handleSendMessage({ message: msg, from: guest ? "guest" : "owner" });
                        }}
                    />
                    <TouchableOpacity style={styles.action} onPress={msg ? () => {
                        setMsg("");
                        handleSendMessage({ message: msg, from: guest ? "guest" : "owner" });
                    } : () => null}>
                        {msg && <PaperPlaneRight color={colors.font2} size={18} />}
                        {!msg && <Microphone color={colors.font2} size={18} />}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
