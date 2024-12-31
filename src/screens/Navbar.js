import React from 'react'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import { Dimensions, Pressable } from 'react-native';

import { View, Icon } from 'components';
import Animated, { SlideInDown, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { SafeAreaView } from 'react-native-safe-area-context'
import { hexToRGB } from 'utils'

const { width } = Dimensions.get('window')
const OPTIONS = [
    { icon: 'House', screen: 'HomeScreen' },
    { icon: 'Bookmark', screen: 'TestScreen' },
    { icon: 'SlidersHorizontal', screen: 'SettingsScreen' }
]
export const Navbar = props => {
    const {
        tab,
        setTab
    } = props;
    const { styles, theme } = useStyles(stylesheet)
    const getBlocks = () => {
        let output = OPTIONS.map(option => {
            return <NavBlock key={option['screen']} {...option} onPress={() => setTab(option['screen'])} is_selected={tab === option['screen']}/>
        })
        return output
    }

    const blocks = getBlocks()
    return (
        <SafeAreaView style={styles.Container} edges={['bottom']}>
            <Animated.View style={styles.Wrapper} entering={SlideInDown.duration(900)}>{blocks}</Animated.View>
        </SafeAreaView>
    )
}

const NavBlock = props => {
    const {
        icon='Home',
        screen='HomeScreen',
        is_selected,
        onPress
    } = props;
    const { styles, theme } = useStyles(stylesheet)

    // Didn't use Collapsible because the marker was not being shown for the initial render
    const animatedStyle = useAnimatedStyle(() => {
        return {
            height: withTiming(is_selected ? theme.spacing.xs + 1 : 0),
            opacity: withTiming(is_selected ? 1 : 0)
        }
    })

    return (
        <Pressable style={styles.NavBlock} onPress={() => onPress(screen)}>
            <Icon name={icon} color={theme.colors.base[is_selected ? 'text_100' : 'text_300']}/>
            <Animated.View style={animatedStyle}> 
                <View style={styles.Marker}/>
            </Animated.View>
        </Pressable>
    )
}

const stylesheet = createStyleSheet(theme => {
    return {
        Container: {
            position: 'absolute',
            width,
            justifyContent: 'center',
            alignItems: 'center',
            bottom: 0,
            backgroundColor: hexToRGB(theme.colors.base.surface_100, 0.50),
            shadowColor: theme.colors.base.surface_100,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,
            shadowRadius: 10,
            paddingTop: theme.spacing.lg
        },
        Wrapper: {
            backgroundColor: theme.colors.base.surface_300,
            borderRadius: 50,
            paddingHorizontal: theme.spacing.xl,
            flexDirection: 'row',
            alignItems: 'center',
            height: 54
        },
        NavBlock: {
            padding: theme.spacing.md,
            alignItems: 'center'
        },
        Marker: {
            width: 16,
            borderWidth: 1,
            borderColor: theme.colors.base.text_100,
            marginTop: theme.spacing.xs
        }
    }
});