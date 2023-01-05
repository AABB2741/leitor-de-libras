import {
    View
} from "react-native";
import FixedCategory from "../../../components/FixedCategory";
import { useLang } from "../../../contexts/Lang";

import styles from "./styles";

export default function Lang() {
    const lang = useLang();

    return (
        <View style={styles.container}>
            <FixedCategory title={lang.settings.display.lang.lang.title}>
                
            </FixedCategory>
        </View>
    );
}
