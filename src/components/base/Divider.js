import React from 'react'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import { View } from 'react-native'

export const Divider = props => {
    const {

    } = props;
    const { styles } = useStyles(stylesheet)

    return (
        <View style={styles.Container}/>
    )
}

const stylesheet = createStyleSheet(theme => {
    return {
        Container: {
            borderBottomWidth: 1,
            borderColor: theme.colors.base.border_100,
            borderStyle: 'dashed',
        },
    }
});
