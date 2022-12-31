import {
    View
} from "react-native";
import Font from "../../../components/Font";
import { useColors } from "../../../contexts/Colors";
import { useLang } from "../../../contexts/Lang";

import createStyles from "./styles";

export default function Appearance() {
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors });

    return (
        <View>
            <Font preset="text">Appearance</Font>
        </View>
    )
}
