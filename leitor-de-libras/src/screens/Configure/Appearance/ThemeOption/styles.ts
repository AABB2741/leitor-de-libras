import { StyleSheet } from 'react-native';
import Theme from "../../../../@types/Theme";

interface ThemeOptionStyle {
    colors: Theme;
    sample: Theme;
}

export default ({ colors, sample }: ThemeOptionStyle) => StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: colors.background2,
        borderRadius: 12,
        marginBottom: 20,
    },
    presentation: {
        flexDirection: "row",
        alignItems: "center"
    },
    infos: {
        flexDirection: "row",
        alignItems: "center"
    },
    name: {
        marginLeft: 10
    },
    preview: {
        borderWidth: 1,
        borderColor: colors.desc3,
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
        backgroundColor: sample.background2,
        alignItems: "center",
        justifyContent: "center"
    },
    previewTitleContainer: {
        flex: 1,
        marginLeft: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: sample.background2,
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
        marginTop: 10
    },
    previewExample: {
        color: sample.font,
        fontSize: 12
    }
});
