import { StyleSheet } from 'react-native';
import Theme from "../../@types/Theme";

interface DashboardStyle {
    colors: Theme;
}

export default ({ colors }: DashboardStyle) => StyleSheet.create({
    container: {
        paddingVertical: 20,
        backgroundColor: colors.background,
        flex: 1
    },
    welcome: {
        fontSize: 20,
        paddingHorizontal: 20
    }
})
