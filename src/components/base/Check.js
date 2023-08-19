import React from 'react'
import { StyleSheet, View, Text, Pressable } from 'react-native'
import { useSelector } from 'react-redux'

import Ripple from 'react-native-material-ripple';
import { Icon } from "@rneui/themed";
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing, withSequence } from 'react-native-reanimated';

import { getTextColor } from 'utils'

export const Check = props => {
    const {
        checked=false,
        onPress,
        color,
        selectable=true,
        disable=false,
        label,
        animated=true,
        size
    } = props;
    const theme = useSelector(state => state.db.theme)
    const font = useSelector(state => state.db.preferences.font)
    const styles = StyleSheet.create({
        Container: {
            flex: label ? 0 : 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 0,
            width: label ? 'auto' : '100%',
            flexDirection: 'row',
            ...props.styles
        },
        Text: {
            color: theme['--text-color-300'],
            fontSize: theme['--font-size'],
            fontFamily: font,
        }
    })
    const iconColor = getTextColor(color || theme['--text-color'])
    // const iconColor = theme['--text-color']

    

    if(!animated) {
        return (
            <Ripple style={styles.Container} onPress={!disable && onPress}>
                <View style={{
                    borderWidth: 2,
                    borderRadius: theme['--border-radius'],
                    borderColor: checked ? theme['--success-color'] : theme['--bg-color-200'],
                    backgroundColor: checked ? theme['--success-color'] : 'transparent',
                    aspectRatio: 1,
                    width: size || theme['--padding']*1.3
                }}>
                    {checked && 
                    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                        <Icon name={'check'} type={'material-community'} size={16} color={iconColor}/>
                    </View>}
                </View>
                {label && <Text style={styles.Text}>{label}</Text>}
            </Ripple>
        )
    } else {
        const selected = useSharedValue(checked)
        const error = useSharedValue(false)

        const onPressHandler = () => {
            if(!selectable) {
                error.value = true
            } else {
                const newValue = !selected.value
                onPress && onPress(newValue, (hasError => {
                    error.value = hasError ? hasError : false
                    if(!hasError) {
                        selected.value = newValue
                    }
                }))
                // setTimeout(() => {
                //     onPress && onPress(newValue)
                // }, 100)
            }
        }

        const animationConfig = { duration: 100, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }
        const shakeDistance = 3
        const shakeConfig = { duration: 50 }
        const animatedStyle = useAnimatedStyle(() => {
            return {
                marginRight: label ? theme['--padding']/2 : 0,
                borderWidth: 2,
                borderRadius: theme['--border-radius'],
                borderColor: withTiming(
                    error.value ? theme['--error-color'] : selected.value ? theme['--success-color'] : theme['--bg-color-200'],
                    animationConfig
                ),
                backgroundColor: withTiming(
                    selected.value ? theme['--success-color'] : 'transparent',
                    animationConfig
                ),
                aspectRatio: 1,
                width: size || theme['--padding']*1.3,
                transform: [
                    {
                        translateX: !error.value ? 0 : withSequence(
                            withTiming(-shakeDistance, shakeConfig),
                            withTiming(shakeDistance, shakeConfig),
                            withTiming(-shakeDistance, shakeConfig),
                            withTiming(shakeDistance, shakeConfig),
                            withTiming(-shakeDistance, shakeConfig, () => error.value = false)
                        )
                    },
                ]
                
            }
        }, [])

        const checkStyle = useAnimatedStyle(() => {
            return {
                opacity: withTiming(
                    selected.value ? 1 : 0,
                    animationConfig
                ),
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
            }
        }, [])

        

        return (
            <Ripple style={styles.Container} onPress={!disable && onPressHandler}>
                <Animated.View style={animatedStyle}>
                    <Animated.View style={checkStyle}>
                        <Icon name={'check'} type={'material-community'} size={16} color={iconColor}/>
                    </Animated.View>
                </Animated.View>
                {label && <Text style={styles.Text}>{label}</Text>}
            </Ripple>
        )
    }
    
}