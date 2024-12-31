import { ActivityIndicator } from 'react-native-paper';
import { useStyles } from 'react-native-unistyles'

export const Spinner = props => {
    const {
        size=16,
        color
    } = props;
    const { theme } = useStyles()

    return (
        <ActivityIndicator
            color={color || theme.colors.gray.text_300}
            size={size}
            />
    )
}