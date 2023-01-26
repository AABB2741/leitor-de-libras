import { StyleSheet } from 'react-native';

import { ThemeProps } from '../../../theme/getTheme';

interface AppearanceStyle {
    colors: ThemeProps;
}

export default ({ colors }: AppearanceStyle) => StyleSheet.create({
    themesContainer: {
        
    },
    themes: {
        paddingLeft: 20,
        paddingRight: 10,
        flexDirection: "row"
    }
});
