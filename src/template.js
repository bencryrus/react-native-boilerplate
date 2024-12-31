import React from 'react'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

import { Text, View } from 'components';

export const Component = props => {
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
            flex: 1,
            backgroundColor: theme.colors.gray.surface_100,
            alignItems: 'center',
            justifyContent: 'center',
        },
    }
});
