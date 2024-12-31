import React from 'react'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

import { Text, View, Icon, Pressable } from '../base';
import { hexToRGB } from 'utils'

export const Chip = props => {
    const {
        label,
        onRemove,
        onSelect,
        selected,
        color
    } = props;
    const stylesheet = createStyleSheet(theme => {
        const backgroundColor = hexToRGB(color, 0.2)
        return {
            Container: {
                // flex: 1,
                backgroundColor,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
                height: 28,
                paddingHorizontal: theme.spacing.lg,
                paddingRight: (onRemove || selected) && theme.spacing.sm,
                flexDirection: 'row',
                alignItems: 'center',
                gap: theme.spacing.xs
            },
        }
    });
    const { styles, theme } = useStyles(stylesheet)

    const onPress = () => {
        onRemove?.()
        onSelect?.()
    }

    return (
        <Pressable style={styles.Container} onPress={onPress} disabled={!onRemove}>
            <Text color={color}>{label}</Text>
            {onRemove ? <Icon color={color} name='X'/>
            : selected ? <Icon color={color} name='Check'/>
            : null}
        </Pressable>
    )
}


