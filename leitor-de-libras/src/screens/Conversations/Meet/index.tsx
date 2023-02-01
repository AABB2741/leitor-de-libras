import {
    TouchableOpacity,
    View
} from "react-native";

import { ConversationProps } from "../../../constants/conversations";

import styles from "./styles";

interface MeetProps extends ConversationProps {

}

export default function Meet({  }: MeetProps) {
    return (
        <View style={styles.container}></View>
    );
}
