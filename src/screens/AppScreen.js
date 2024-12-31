import React from 'react'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

import { Text, View, Pressable } from 'components'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Navbar } from './Navbar';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux'
import { objectId } from 'utils'
import { HomeScreen } from './HomeScreen';
import { TestScreen } from './TestScreen';
import { SettingsScreen } from './SettingsScreen';

export const AppScreen = props => {
    const {

    } = props;
    const { styles, theme } = useStyles(stylesheet)
    const user = useSelector(state => state.user)
    const [tab, setTab] = React.useState('HomeScreen')

    React.useEffect(() => {
        false && console.log(JSON.stringify({...user, user_id: objectId()},null,2))
    }, [])

    const getContent = () => {
        switch(tab) {
            case 'HomeScreen':
                return <HomeScreen/>
            case 'TestScreen':
                return <TestScreen/>
            case 'SettingsScreen':
                return <SettingsScreen/>
            default:
                return (
                    <View style={styles.Container}>
                        <Text>Something went wrong</Text>
                    </View>
                )
        }
    }

    return (
        <View style={styles.Container}>
            <Animated.View key={tab} style={{flex: 1}} entering={FadeIn} exiting={FadeOut}>
                {getContent()}
            </Animated.View>
            <Navbar setTab={setTab} tab={tab}/>
        </View>
    )
}

const stylesheet = createStyleSheet(theme => {
    return {
        Container: {
            flex: 1,
            backgroundColor: theme.colors.gray.surface_100,
        },
        Button: {
            backgroundColor: theme.colors.brand.solid_100,
            ...theme.borders.md,
            borderColor: theme.colors.brand.border_100,
            padding: theme.spacing.md,
        }
    }
});
