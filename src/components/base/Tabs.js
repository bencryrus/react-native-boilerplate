import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useSelector } from 'react-redux'
import Ripple from 'react-native-material-ripple';
import { Tab } from "@rneui/base";

import Animated, { useAnimatedStyle, withTiming, Easing, useSharedValue, useAnimatedRef, measure, useDerivedValue, runOnJS } from 'react-native-reanimated'

export const Tabs = props => {
    const {
        options=[],
        onPress,
        selected,
        divider=false
    } = props
    const theme = useSelector(state => state.db.theme)
    const styles = StyleSheet.create({
        Container: {
            width: '100%',
            flexDirection: 'row',
            borderWidth: 0,
            borderColor: 'red',
        },
        Divider: {
            width: '100%',
            borderBottomWidth: 1,
            borderBottomColor: theme['--outline-variant'],
            position: 'absolute',
            bottom: 1
        }
    })

    const tab = useSharedValue(options[0]['value'])
    const onPressHandler = (newTab) => {
        tab.value = newTab
        onPress && onPress(newTab)
    }

    const animationConfig = { duration: 300, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }
    const textStyles = options.map((option,index) => {
        return useAnimatedStyle(() => {
            return {
                fontSize: theme['--body-medium-fontSize'],
                lineHeight: theme['--body-medium-lineHeight'],
                fontFamily: theme['--body-medium-font'],
                fontWeight: option.value === tab.value ? 'bold' : 'normal',
                color: withTiming(
                    option.value === tab.value ? theme['--on-surface'] : theme['--on-surface-variant'],
                    animationConfig
                ),
            }
        })
    })

    const wrapperStyles = options.map((option, index) => {
        return useAnimatedStyle(() => {
            return {
                paddingHorizontal: theme['--spacing'],
                paddingVertical: theme['--spacing-small'],
                borderBottomWidth: 2,
                borderBottomColor: withTiming(
                    option.value === tab.value ? theme['--primary'] : 'transparent',
                    animationConfig
                )
            }
        })
    })

    return (
        <View style={{width: '100%'}}>
            <View style={styles.Container}>
                {options.map((option, index) => {
                    const { label, value } = option
                    const isSelected = selected === value
                    return (
                        <Ripple key={value} 
                            rippleColor={theme['--on-surface']}
                            onPress={() => onPressHandler(value)}>
                            <Animated.View style={wrapperStyles[index]}>
                                <Animated.Text style={textStyles[index]}>{label}</Animated.Text>
                            </Animated.View>
                            
                        </Ripple>
                    )
                })}
            </View>
            {divider && <View style={styles.Divider}/>}
        </View>
    )
}

