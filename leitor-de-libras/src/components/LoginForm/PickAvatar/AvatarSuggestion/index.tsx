import { CheckCircle } from "phosphor-react-native";
import {
    Image,
    View
} from "react-native";
import { useColors } from "../../../../contexts/colors";
import { useLang } from "../../../../contexts/lang";

import Font from "../../../Font";

import styles from "./styles";

export type Suggestion = {
    code: string;
    url: string;
}

interface AvatarSuggestionProps extends Suggestion {
    chosenSuggestion: Suggestion["code"] | null;
    setChosenSuggestion: React.Dispatch<React.SetStateAction<Suggestion["code"] | null>>;
}

export default function AvatarSuggestion({ code, url }: AvatarSuggestionProps) {
    const colors = useColors();
    const lang = useLang();

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: url }}
                style={styles.image}
            />
            <CheckCircle
                color={colors.check}
                weight="fill"
                style={styles.status}
            />
        </View>
    );
}
