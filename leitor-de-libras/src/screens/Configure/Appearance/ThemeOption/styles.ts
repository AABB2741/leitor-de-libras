import { StyleSheet } from 'react-native';

import { ThemeProps } from '../../../../theme/getTheme';

interface ThemeOptionStyle {
    colors: ThemeProps;
    sample: ThemeProps;
}

export default ({ colors, sample }: ThemeOptionStyle) => StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: colors.background2,
        borderRadius: 12,
        marginBottom: 20,
        maxWidth: 250,
        marginRight: 10
    },
    presentation: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    infos: {
        flexDirection: "row",
        alignItems: "center"
    },
    name: {
        marginLeft: 10
    },
    preview: {
        flex: 1,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 12,
        backgroundColor: sample.background,
        padding: 10,
        marginTop: 15
    },
    previewHeader: {
        flexDirection: "row",
        alignItems: "stretch",
        justifyContent: "space-between"
    },
    previewIcon: {
        padding: 5,
        borderRadius: 6,
        backgroundColor: sample.header,
        alignItems: "center",
        justifyContent: "center"
    },
    previewTitleContainer: {
        flex: 1,
        marginLeft: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: sample.header,
        borderRadius: 6
    },
    previewTitle: {
        color: sample.font,
        fontSize: 12
    },
    previewExampleContainer: {
        padding: 5,
        borderRadius: 6,
        backgroundColor: sample.background2,
        marginTop: 10,
        flex: 1
    },
    previewExample: {
        color: sample.desc,
        fontSize: 11
    }
});
