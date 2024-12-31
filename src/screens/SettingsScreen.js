import React from 'react'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

import { Text, Button } from 'components'
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import * as actions from '../store/actions'
import { useDispatch } from 'react-redux';

export const SettingsScreen = props => {
    const {

    } = props;
    const { styles } = useStyles(stylesheet)
    const navigation = useNavigation()
    const dispatch = useDispatch()

    return (
        <SafeAreaView style={styles.Container}>
            <Text variant='title' size='md'>SettingsScreen</Text>
            <Text variant='label'>I understand that these documents are confidential and cannot be shared with a third party.</Text>
            <Button 
                label='Sign out'
                onPress={() => dispatch(actions.signOut(success => navigation.navigate('AuthScreen')))}
                />
        </SafeAreaView>
    )
}

const stylesheet = createStyleSheet(theme => {
    return {
        Container: {
            flex: 1,
            backgroundColor: theme.colors.gray.surface_100,
            padding: theme.spacing.md,
        }
    }
});
