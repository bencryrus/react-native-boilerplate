import React from 'react'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

import { View, Text, Icon } from '../base'

export const Labels = props => {
    const {
        values=[]
    } = props;
    const { styles, theme } = useStyles(stylesheet)

    return (
        <View style={[styles.Container, props.style]}>
            {values.map(({label, color=theme.colors.gray.text_300, icon}) => {
                return label && (
                    <View style={styles.Label}>
                        {icon && <Icon name={icon} color={color} size={16}/>}
                        <Text color={color} variant={'code'}>{label}</Text>
                    </View>
                )
            })}
        </View>
    )
}

const stylesheet = createStyleSheet(theme => {
    return {
        Container: {
            alignItems: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: theme.spacing.sm,
            rowGap: theme.spacing.xs
        },
        Label: {
            flexDirection: 'row',
            gap: theme.spacing.xs,
            alignItems: 'center'
        }
    }
});
