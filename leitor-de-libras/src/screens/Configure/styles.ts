import { StyleSheet } from 'react-native';
import Theme from "../../@types/Theme";

interface ConfigureStyle {
    colors: Theme;
}

export default ({ colors }: ConfigureStyle) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    emptyContainer: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 20
    },
    presentation: {
        padding: 20,
        paddingVertical: 50,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        marginTop: 5,
        fontSize: 20
    },
    desc: {
        fontSize: 16,
        marginTop: 10,
        color: colors.desc,
        textAlign: "center"
    },
    content: {
        padding: 20
    }
});
