import { StyleSheet } from "react-native";
import { ThemeProps } from "../../../theme/getTheme";

interface PickAvatarStyle {
    colors: ThemeProps;
}

export default ({ colors }: PickAvatarStyle) => StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: colors.background
    },
    container: {
        padding: 20
    },
    title: {
        flex: 1,
        textAlign: "center",
        marginBottom: 10,
        fontSize: 20
    },
    desc: {
        textAlign: "center",
        flex: 1
    },
    options: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20
    },
    currentAvatar: {
        backgroundColor: colors.background2,
        width: 150,
        height: 150,
        resizeMode: "cover",
        borderRadius: 75,
        alignSelf: "center",
        marginVertical: 20
    },
    username: {
        fontSize: 20,
        textAlign: "center"
    },
    about: {
        fontSize: 14,
        textAlign: "center"
    },
    pickFromGallery: {
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    pickFromGalleryLabel: {
        color: colors.accent,
        marginLeft: 10
    },
    loading: {
        alignSelf: "center",
        marginTop: 30
    }
});
