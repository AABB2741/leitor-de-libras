import { StyleSheet } from 'react-native';

import { ThemeProps } from '../../../theme/getTheme';

interface ConfigSectionStyle {
    colors: ThemeProps;
}

export default ({ colors }: ConfigSectionStyle) => StyleSheet.create({
    container: {
        margin: 20,
        marginBottom: 0
    },
    configs: {
        backgroundColor: colors.background2,
        borderRadius: 12,
        marginTop: 10,
        overflow: "hidden",
        paddingBottom: 20
    },
    config: {
        padding: 20,
        paddingBottom: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    configInfos: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        paddingHorizontal: 20
    },
    configDesc: {
        fontSize: 12,
        color: colors.desc
    }
});
