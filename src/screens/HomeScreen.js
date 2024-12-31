import React from 'react'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

import { Text, View, Button } from 'components';

import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const HomeScreen = props => {
    const {

    } = props;
    const { styles, theme } = useStyles(stylesheet)
    const navigation = useNavigation()

    return (
        <SafeAreaView style={styles.Container}>
            <Text variant='title' size='md'>HomeScreen</Text>
            <Text variant='label'>I understand that these documents are confidential and cannot be shared with a third party.</Text>

            <View style={{gap: theme.spacing.md}}>
                <Button
                    label={'Gesture demo'}
                    onPress={() => navigation.push('GestureDemoScreen')}
                    />
            </View>
        </SafeAreaView>
    )
}

const stylesheet = createStyleSheet(theme => {
    return {
        Container: {
            flex: 1,
            backgroundColor: theme.colors.gray.surface_100,
            padding: theme.spacing.md
        },
    }
});
