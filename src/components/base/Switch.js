import React from 'react'
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux';

import Animated, { useAnimatedStyle, withTiming, Easing, useSharedValue } from 'react-native-reanimated'
import Ripple from 'react-native-material-ripple';

export const Switch = props => {
    const {
        onPress,
        initial=false,
    } = props;
    const isActive = useSharedValue(initial)
    const theme = useSelector(state => state.db.theme)
    const unit = 18 || theme['--body-medium-fontSize']
    const styles = StyleSheet.create({
        Container: {
            
        }
    })
    const animationConfig = { duration: 300, easing: Easing.bezier(0.25,0.1,0.25,1) }
    const containerStyle = useAnimatedStyle(() => {
        return {
            borderWidth: 2,
            borderRadius: 50,
            borderColor: withTiming(
                isActive.value ? theme['--success'] : theme['--outline'],
                animationConfig
            ),
            padding: 0,
            height: unit*1.5,
            width: unit*2.5,
            backgroundColor: withTiming(
                isActive.value ? theme['--success-container'] : theme['--surface'],
                animationConfig
            )
        }
    })

    const indicatorStyle = useAnimatedStyle(() => {
        const spacing = unit*0.3
        const size = unit*0.75
        const translateX = withTiming(
            isActive.value ? unit*2.5 - (spacing*2) - size + 2 : spacing,
            animationConfig
        )
        return {
            backgroundColor: withTiming(
                isActive.value ? theme['--success'] : theme['--outline'],
                animationConfig

            ),
            width: size,
            height: size,
            borderRadius: 50,
            transform: [{translateX}, { translateY: (unit*1.5 - size)/2 -2}]
        }
    })

    const onSelect = () => {
        isActive.value = !isActive.value
        onPress && onPress(!isActive.value)
    }

    return (
        <Ripple onPress={onSelect} rippleContainerBorderRadius={50}>
            <Animated.View style={containerStyle}>
                <Animated.View style={indicatorStyle}/>
            </Animated.View>
        </Ripple>
    )
}