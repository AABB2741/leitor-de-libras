import { StyleSheet } from 'react-native';
import Theme from "../../@types/Theme";

interface Props {
    colors: Theme;
}

export default ({ colors }: Props) => StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "center",
        marginVertical: 20
    },
    title: {
        marginTop: 10,
        marginBottom: 5,
        fontSize: 16,
        color: colors.font,
        textAlign: "center"
    },
    desc: {
        fontSize: 14,
        color: colors.desc,
        textAlign: "center"
    },
    options: {
        marginTop: 10
    },
    option: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 50,
        marginTop: 10,
        alignItems: "center"
    },
    optionLabel: {
        fontSize: 14,
        textAlign: "center"
    }
});
