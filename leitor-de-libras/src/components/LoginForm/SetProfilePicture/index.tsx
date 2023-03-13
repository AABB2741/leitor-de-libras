import {
    ScrollView,
    View
} from "react-native";
import { useColors } from "../../../contexts/colors";
import { useLang } from "../../../contexts/lang";
import { useUser } from "../../../contexts/user";

import Font from "../../Font";

import createStyles from "./styles";

export default function SetProfilePicture() {
    const { user } = useUser();
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors });
    
    return (
        <ScrollView style={styles.container}>
            <Font family="black">{lang.set_profile_picture.title.replace("%s", user?.name ?? "")}</Font>
        </ScrollView>
    );
}
