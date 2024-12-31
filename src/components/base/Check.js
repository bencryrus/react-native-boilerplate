import React from 'react'
import { Pressable } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

import Animated, { useAnimatedStyle, interpolateColor, withTiming } from 'react-native-reanimated'
import { Icon } from './Icon'

const size = 28;
const animation_duration = 300
export const Check = props => {
    const {
        selected,
        selected_color,
        unselected_color,
        onSelect,
    } = props;
    
    const [value, setValue] = React.useState(selected)
    const { styles, theme } = useStyles(stylesheet)
    const color = value ? selected_color || '#3DD68C' // theme.colors.green.solid_100
                : unselected_color || theme.colors.base.border_100

    const animatedStyle = useAnimatedStyle(() => {
        return {
            width: size,
            aspectRatio: 1,
            borderRadius: theme.border_radius.md,
            borderWidth: 2,
            borderColor: withTiming(interpolateColor(
                value,
                [0, 1],
                [theme.colors.base.border_100, theme.colors.green.solid_100]
            ), { duration: animation_duration }),
            alignItems: 'center',
            justifyContent: 'center'
        }
    })

    const animatedWrapper = useAnimatedStyle(() => {
        return {
            position: 'absolute',
            zIndex: 2,
            width: size,
            aspectRatio: 1,
            borderRadius: theme.border_radius.md,
            backgroundColor: withTiming(interpolateColor(
                value,
                [0, 1],
                ['transparent', theme.colors.green.solid_100]
            ), { duration: animation_duration }),
            opacity: 0.5
        }
    })

    const onSelectHandler = () => {
        onSelect?.(!value)
        setValue(!value)
    }

    return (
        <Pressable onPress={onSelectHandler} style={[styles.Container, props.style]}>
            <Animated.View style={animatedStyle}>
                <Animated.View style={animatedWrapper}/>
                {value && <Icon name='Check' color={color} size={16}/>}
            </Animated.View>
        </Pressable>

    )
}

const stylesheet = createStyleSheet(theme => {
    return {
        Container: {
            width: size,
            aspectRatio: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }
    }
});