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

interface Props extends MeetProps {
    handleDeleteMeet: (id: string) => Promise<boolean>;
}

export default function Meet({ id, title, guestName, date, handleDeleteMeet }: Props) {
    const lang = useLang();
    const colors = useColors();
    const { user } = useUser();

    const [deleteVisible, setDeleteVisible] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteErrVisible, setDeleteErrVisible] = useState(false);

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
                text={lang.conversations.delete.text.replace("%s", title || lang.conversations.untitled.replace("%s", guestName || lang.conversations.chat.guest))}
                type="boolean"
                caution
                visible={deleteVisible}
                loading={deleteLoading}
                onRequestClose={() => setDeleteVisible(false)}
                onRespondBoolean={async response => {
                    if (!response)
                        return setDeleteVisible(false);

                    setDeleteLoading(true);
                    const deleted = await handleDeleteMeet(id);
                    if (!deleted) {
                        setDeleteErrVisible(true);
                    }

                    setDeleteLoading(false);
                    setDeleteVisible(false);
                }}
            />
            <Popup
                title={lang.conversations.delete_err.title}
                text={lang.conversations.delete_err.text.replace("%s", title || lang.conversations.untitled.replace("%s", guestName || lang.conversations.chat.guest))}
                onRequestClose={() => setDeleteErrVisible(false)}
                visible={deleteErrVisible}
            />
            <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("Chat", { id })}>
                <Image
                    source={user?.avatar}
                    style={styles.avatar}
                />
                <View style={styles.infos}>
                    <Font
                        family="ubuntu"
                        style={styles.title}
                        numberOfLines={1}
                    >{title || lang.conversations.untitled.replace("%s", guestName ?? "")}</Font>
                    <Font
                        style={styles.desc}
                        numberOfLines={1}
                    >{guestName ? `${guestName} ∙ ` : ""}{moment(date).fromNow()}</Font>
                </View>
                <TouchableOpacity onPress={() => setDeleteVisible(true)}>
                    <Trash size={18} color={colors.critic} />
                </TouchableOpacity>
            </TouchableOpacity>
        </>
    );
}
