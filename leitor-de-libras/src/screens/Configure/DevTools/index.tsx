import {
    View
} from "react-native";
import { useColors } from "../../../contexts/colors";
import * as Storage from "../../../services/Storage";

import Button from "../../../components/Button";

import createStyles from "./styles";

export default function DevTools() {
    const colors = useColors();

    const styles = createStyles({ colors });

    return (
        <View>
            <Button label="Apagar dados" onPress={() => Storage.clear()} />
        </View>
    );
}
