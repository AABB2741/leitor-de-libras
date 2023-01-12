import { StyleSheet } from 'react-native';

import { ThemeProps } from '../../../theme/getTheme';

interface FileStyle {
    colors: ThemeProps;
}

export default ({ colors }: FileStyle) => StyleSheet.create({
    container: {
        flex: 1 / 3,
        paddingHorizontal: 10,
        marginBottom: 20
    },
    indicators: {
        marginBottom: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    props: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end"
    },
    thumbnail: {
        backgroundColor: colors.background2,
        width: "100%",
        height: 75,
        borderRadius: 12
    },
    title: {
        marginTop: 5,
        fontSize: 12
    },
    date: {
        color: colors.desc,
        fontSize: 10
    }
});
