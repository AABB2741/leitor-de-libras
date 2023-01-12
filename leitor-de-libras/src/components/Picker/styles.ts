import { StyleSheet } from 'react-native';
import Theme from "../../@types/Theme";

interface PickerStyle {
    colors: Theme;
}

export default ({ colors }: PickerStyle) => StyleSheet.create({
    container: {
        backgroundColor: colors.background2,
        borderRadius: 16,
        paddingVertical: 10
    },
    defaultOption: {
        borderBottomWidth: 1,
        borderBottomColor: colors.desc3,
        paddingBottom: 20,
        marginBottom: 10
    },
    option: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    optionLabel: {
        marginLeft: 10,
        flex: 1
    }
});
