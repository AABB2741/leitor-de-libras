import {
    useState
} from "react";
import {
    TouchableOpacity,
    View,
    Image
} from "react-native";
import {
    Trash
} from "phosphor-react-native";
import moment from "moment";

import Popup from "../../../components/Popup";
import Font from "../../../components/Font";
import { useLang } from "../../../contexts/lang";
import { useUser } from "../../../contexts/user";
import { useColors } from "../../../contexts/colors";

import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface MeetProps extends ConversationProps {

}

export default function Meet({ id, title, date }: MeetProps) {
    const lang = useLang();
    const colors = useColors();
    const { user } = useUser();

    const [deleteVisible, setDeleteVisible] = useState(false);

    const navigation = useNavigation<NativeStackNavigationProp<TalkParamList, "Conversations">>();

    moment.updateLocale(lang.locale, {
        relativeTime: {
            ...lang.general.unity
        }
    });

    return (
        <>
            <Popup
                title={lang.conversations.delete.title}
                text={lang.conversations.delete.text.replace("%s", title)}
                type="boolean"
                caution
                visible={deleteVisible}
                onRequestClose={() => setDeleteVisible(false)}
                onRespondBoolean={response => {
                    if (!response)
                        return setDeleteVisible(false);
                }}
            />
            <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("Chat", { id })}>
                <Image
                    source={user?.avatar}
                    style={styles.avatar}
                />
                <View style={styles.infos}>
                    <Font
                        preset="subtitle"
                        style={styles.title}
                        numberOfLines={1}
                    >{title}</Font>
                    <Font
                        preset="desc"
                        style={styles.desc}
                        numberOfLines={1}
                    >{moment(date).fromNow()}</Font>
                </View>
                <TouchableOpacity onPress={() => setDeleteVisible(true)}>
                    <Trash size={18} color={colors.critic} />
                </TouchableOpacity>
            </TouchableOpacity>
        </>
    );
}
