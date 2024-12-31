import React from 'react'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

import { Text, View } from 'react-native';

export const Modal = props => {
    const {

    } = props;
    const { styles } = useStyles(stylesheet)

    return (
        <View style={styles.Container}>
            <Text>Component</Text>
        </View>
    )
}

const stylesheet = createStyleSheet(theme => {
    return {
        Container: {
            // flex: 1,
            minHeight: 100,
            width: '100%',
            backgroundColor: theme.colors.gray.surface_100,
        },
    }
});
