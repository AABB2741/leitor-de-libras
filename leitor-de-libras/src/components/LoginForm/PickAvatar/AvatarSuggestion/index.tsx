import { CheckCircle } from "phosphor-react-native";
import {
    Image,
    TouchableOpacity
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

export default function AvatarSuggestion({ code, url, chosenSuggestion, setChosenSuggestion }: AvatarSuggestionProps) {
    const colors = useColors();
    const lang = useLang();
    console.log("URL: " + url)
    return (
        <TouchableOpacity style={styles.container} onPress={() => setChosenSuggestion(code)}>
            <Image
                source={{ uri: url }}
                style={styles.image}
            />
            <CheckCircle
                color={colors.check}
                weight="fill"
                style={[styles.status, { display: code === chosenSuggestion ? "flex" : "none"}]}
            />
        </TouchableOpacity>
    );
}
