import React from 'react'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

import { Text, View, Pressable } from 'components'
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import { googleLogin, appleLogin } from 'utils';
import auth from '@react-native-firebase/auth';
import { store } from 'store'
import { useSelector } from 'react-redux'

export const AuthScreen = props => {
    const {

    } = props;
    const { styles, theme } = useStyles(stylesheet)
    const navigation = useNavigation()
    const [loading, setLoading] = React.useState(false)
    const user = useSelector(state => state.user)
    console.log({user})
    React.useEffect(() => {
        // persistor.purge()
        const subscriber = auth().onAuthStateChanged(onAuth);
        return subscriber; // unsubscribe on unmount
    }, []);

    const onAuth = (values) => {
        if(!values) { return }
        store.dispatch({ type: 'UPDATE_DATA', data: null })
        store.dispatch({ type: 'UPDATE_USER', user: null })
        navigation.replace('LoadingScreen')
    }

    const onSocialLogin = async(provider) => {
        if(loading) { return }
        // setLoading(true)
        switch(provider) {
            case 'google':
                return googleLogin().then(res => setLoading(false))
            case 'apple':
                return appleLogin().then(res => setLoading(false))
        }
    }
    
    return (
        <SafeAreaView style={styles.Container}>
            <Text variant='title' size='md'>AuthScreen</Text>
            <Text variant='label'>I understand that these documents are confidential and cannot be shared with a third party.</Text>

            {/* <Pressable>
                <View style={styles.Button}>
                    <Text color={theme.colors.brand.text_200} align='center'>Test</Text>
                </View>
            </Pressable> */}
            
            {/* Sign in buttons */}
            <View
                style={{marginTop: theme.spacing.md, gap: theme.spacing.md, alignItems: 'center'}}>
                <Pressable 
                    style={styles.Button} 
                    onPress={() => onSocialLogin('google')}
                    disabled={loading}
                    >
                    {/* <Image source={GoogleIcon} style={styles.Icon} resizeMode={'contain'}/> */}
                    <Text align='center'>Continue with Google</Text>
                </Pressable>

                <Pressable 
                    style={styles.Button} 
                    onPress={() => onSocialLogin('apple')}
                    disabled={loading}
                    >
                    {/* <Image source={AppleIcon} style={{width: 40, height: 40}} resizeMode={'contain'}/> */}
                    <Text align='center'>Continue with Apple</Text>
                </Pressable>

                {/* <Collapsible collapsed={!loading}>
                    <Spinner color={theme['--on-surface']} style={{marginTop: theme['--spacing']}}/>
                </Collapsible> */}
            </View>
        </SafeAreaView>
    )
}

const stylesheet = createStyleSheet(theme => {
    return {
        Container: {
            flex: 1,
            backgroundColor: theme.colors.gray.surface_100,
            padding: theme.spacing.md,
        },
        Button: {
            backgroundColor: theme.colors.brand.solid_100,
            ...theme.borders.md,
            borderColor: theme.colors.brand.border_100,
            padding: theme.spacing.md,
            width: '90%'
        }
    }
});
