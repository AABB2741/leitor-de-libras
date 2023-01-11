import { StyleSheet } from 'react-native';
import { IndicatorProps } from '.';

type IndicatorStyle = Omit<IndicatorProps, "onPress">;

export default ({ value, disabled, activeColor, inactiveColor, disabledColor, size }: IndicatorStyle) => StyleSheet.create({
    border: {
        borderWidth: 2,
        padding: 3,
        borderColor: value ? activeColor : inactiveColor,
        width: size ?? 20,
        height: size ?? 20,
        borderRadius: size ? (size / 2) : 10
    },
    fill: {
        backgroundColor: value ? activeColor : "transparent",
        flex: 1,
        borderRadius: size ? (size / 2) : 10
    }
});
