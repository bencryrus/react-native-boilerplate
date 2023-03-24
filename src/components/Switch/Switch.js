import React from 'react'
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux';

import Animated, { useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated'
import Ripple from 'react-native-material-ripple';

import { hextoRGB } from 'utils'

const Switch = props => {
    const {
        isActive=false,
        onPress,
        color,
    } = props;
    const theme = useSelector(state => state.db.theme)
    const unit = 20 || theme['--font-size']
    const primaryColor = color || theme['--primary-color']
    const secondaryColor = theme['--bg-color']
    const styles = StyleSheet.create({
        Container: {
            borderWidth: 2,
            borderRadius: 50,
            borderColor: isActive ? primaryColor : primaryColor,
            padding: 0,
            height: unit*1.5,
            width: unit*2.5,
            backgroundColor: hextoRGB(isActive ? primaryColor : secondaryColor, 0.3)
        }
    })

    const indicatorStyle = useAnimatedStyle(() => {
        const spacing = unit*0.3
        const size = unit*0.75
        const translateX = withTiming(
            isActive ? unit*2.5 - (spacing*2) - size + 2 : spacing,
            { duration: 300, easing: Easing.bezier(0.25,0.1,0.25,1) }
        )
        return {
            backgroundColor: isActive ? primaryColor : primaryColor,
            width: size,
            height: size,
            borderRadius: 50,
            transform: [{translateX}, { translateY: (unit*1.5 - size)/2 -2}]
        }
    })

    const onSelect = () => {
        onPress && onPress(!isActive)
    }

    return (
        <Ripple style={styles.Container} onPress={onSelect}>
            <Animated.View style={indicatorStyle}/>
        </Ripple>
    )
}

export default Switch