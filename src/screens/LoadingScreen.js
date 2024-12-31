import React from 'react'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

import { Text, Spinner } from 'components'
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { store } from 'store'
import { useSelector } from 'react-redux';
import _ from 'lodash'

export const LoadingScreen = props => {
    const {

    } = props;
    const { styles, theme } = useStyles(stylesheet)
    const navigation = useNavigation()
    const user = useSelector(state => state.user)

    React.useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuth);
        return subscriber;
    }, [])

    const onAuth = (values) => {
        if(!values) { 
            navigation.replace('AuthScreen') 
            store.dispatch({ type: 'UPDATE_DATA', data: null })
            store.dispatch({ type: 'UPDATE_USER', user: null })
        } else {
            // [TODO] Initial load
            navigation.replace('AppScreen')
            store.dispatch({ type: 'UPDATE_USER', user: {..._.pick(values, ['displayName','email','uid']), provider: values.providerData[0]['providerId'] }})
        }
    }

    return (
        <SafeAreaView style={styles.Container}>
            <Text variant='code'>LOADING</Text>
            <Spinner/>
        </SafeAreaView>
    )
}

const stylesheet = createStyleSheet(theme => {
    return {
        Container: {
            flex: 1,
            backgroundColor: theme.colors.gray.surface_100,
            padding: theme.spacing.md,
            alignItems: 'center',
            justifyContent: 'center',
            gap: theme.spacing.sm
        },
    }
});
