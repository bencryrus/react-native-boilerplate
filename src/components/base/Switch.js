import React from 'react'
import { Pressable } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

import Animated, { useAnimatedStyle, interpolateColor, withTiming } from 'react-native-reanimated'
import { hexToRGB } from 'utils'

const height = 20
const animation_duration = 300
export const Switch = props => {
    const {
        selected,
        onSelect
    } = props;
    const [value, setValue] = React.useState(selected)
    const { styles, theme } = useStyles(stylesheet)
    const unselected_border_color = theme.colors.base.border_100
    const selected_border_color = theme.colors.green.solid_100
    const selected_background_color = hexToRGB(selected_border_color, 0.5)
    const onSelectHandler = () => {
        setValue(!value)
        onSelect?.(!value)
    }

    const animatedWrapper = useAnimatedStyle(() => {
        return {
            width: 50,
            height: 28,
            padding: 4,
            borderRadius: 50,
            borderWidth: 2,
            borderColor: withTiming(interpolateColor(
                value,
                [0, 1],
                [unselected_border_color, selected_border_color]
            ), { duration: animation_duration }),
            backgroundColor: withTiming(interpolateColor(
                value,
                [0, 1],
                ['transparent', selected_background_color]
            ), { duration: animation_duration }),
        }
    })

    const animatedIndicator = useAnimatedStyle(() => {
        return {
            width: 16,
            aspectRatio: 1,
            borderRadius: 50,
            backgroundColor: withTiming(interpolateColor(
                value,
                [0, 1],
                [theme.colors.base.border_100, theme.colors.green.solid_100]
            ), { duration: animation_duration }),
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            left: withTiming(value ? 26: 4, animation_duration),
            top: 4
        }
    })

    return (
        <Pressable onPress={onSelectHandler} style={[styles.Container, props.style]}>
            <Animated.View style={animatedWrapper}>
                <Animated.View style={animatedIndicator}/>
            </Animated.View>
        </Pressable>
    )
}

const stylesheet = createStyleSheet(theme => {
    return {
        Container: {
            width: 50 // 50 width + 2 borde width
        }
    }
});