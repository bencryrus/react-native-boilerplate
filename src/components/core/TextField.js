import React from 'react'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

import { Text, View, Collapsible } from '../base';
import { Button } from './Button'
import { TextInput } from 'react-native';
import Animated, { useAnimatedStyle, interpolateColor, withTiming } from 'react-native-reanimated'

const ANIMATION_DURATION = 100
export const TextField = props => {
    const {
        defaultValue,
        trailing='Search',
        placeholder='Search...',
        onChange,
        onSubmit,
        required=false,
        resetOnClear=false,
        multiline=false
    } = props;
    const stylesheet = createStyleSheet(theme => {
        return {
            Container: {
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: theme.colors.base.border_300,
                borderRadius: theme.border_radius.md,
                paddingLeft: theme.spacing.md
            },
            TextInput: {
                borderWidth: 0,
                borderColor: 'red',
                flex: 1,
                color: theme.colors.base.text_100,
                ...theme.text.body.md,
                height: multiline ? 64 : 'auto',
            },
            Row: {
                flexDirection: 'row',
                justifyContent: 'flex-end'
            }
        }
    });
    const { styles, theme } = useStyles(stylesheet)
    const [focused, setFocus] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(false)
    const [value, setValue] = React.useState(defaultValue)
    const ref = React.useRef()

    const onChangeText = (text) => {
        onChange?.(text)
        setValue(text)
    }

    const onClear = () => {
        setFocus(!focused)
        ref.current?.blur()
        if(defaultValue && resetOnClear) {
            setValue(defaultValue)
        } else {
            ref.current?.clear()
        }
    }

    const onSubmitHandler = () => {
        const text = value
        if(onSubmit) {
            if(required && text === '') {
                setError(true)
                setTimeout(() => {
                    setError(false)
                }, 1000)
            } else {
                setLoading(true)
                onSubmit(text, success => {
                    setLoading(false)
                    setFocus(false)
                    ref.current?.blur()
                })
            }            
        }
    }

    const onSubmitEditing = ({nativeEvent}) => {
        const { text } = nativeEvent
        if(onSubmit) {
            if(required && text === '') {
                setError(true)
                setTimeout(() => {
                    setError(false)
                }, 1000)
            } else {
                setLoading(true)
                onSubmit(text, success => setLoading(false))
            }            
        }
    }

    const animatedStyle = useAnimatedStyle(() => {
        return {
            flexDirection: multiline ? 'column' : 'row',
            borderWidth: 1,
            borderColor: withTiming(interpolateColor(
                focused,
                [0,1],
                [theme.colors.base.border_100, error ? theme.colors.red.solid_100 : theme.colors.base.border_300]
            ), ANIMATION_DURATION),
            borderRadius: theme.border_radius.md,
            paddingLeft: theme.spacing.md,
            backgroundColor: withTiming(interpolateColor(
                focused,
                [0,1],
                [theme.colors.base.surface_100, theme.colors.base.surface_300]
            ), ANIMATION_DURATION),
            padding: multiline ? theme.spacing.md : 0,
            paddingBottom: multiline && focused ? 0 
                        : multiline && !focused ? theme.spacing.md
                        : 0
        }
    })

    return (
        <View>
            <Animated.View style={animatedStyle}>
                <TextInput
                    ref={ref}
                    defaultValue={defaultValue}
                    style={styles.TextInput}
                    onFocus={() => setFocus(true)}
                    onSubmitEditing={onSubmitHandler}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    value={value}
                    numberOfLines={multiline ? 3 : 1}
                    multiline={multiline}
                    />
                {!multiline ? 
                <Button 
                    icon={focused ? 'X' : trailing} 
                    icon_props={{color: theme.colors.gray.text_300}}
                    onPress={onClear}
                    disabled={!focused}
                    loading={loading}
                    disabled_background_color='transparent'
                    style={{backgroundColor: 'transparent'}}
                    />
                : <Collapsible collapsed={!focused}>
                    <View style={styles.Row}>
                        <Button 
                            icon={'X'} 
                            icon_props={{color: theme.colors.gray.text_300}}
                            onPress={onClear}
                            disabled={loading}
                            disabled_background_color='transparent'
                            style={{backgroundColor: 'transparent'}}
                            />
                        <Button 
                            icon={'Check'} 
                            icon_props={{color: theme.colors.red.solid_100}}
                            onPress={onSubmitHandler}
                            disabled={loading}
                            loading={loading}
                            disabled_background_color='transparent'
                            style={{backgroundColor: 'transparent'}}
                            />
                    </View>
                </Collapsible>}
            </Animated.View>
            <Collapsible collapsed={!error}>
                <Text variant='error' color={theme.colors.red.solid_100} style={{margin: theme.spacing.xs}}>*Required</Text>
            </Collapsible>
        </View>
    )
}
