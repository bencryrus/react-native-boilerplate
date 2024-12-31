import React from 'react'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

import { FlatList } from 'react-native'
import { Text, View, Pressable } from 'components';
import Animated, { interpolateColor, useAnimatedStyle, withTiming } from 'react-native-reanimated'

const ANIMATION_DURATION = 300
export const Tabs = props => {
    const {
        options=[],
        onSelect
    } = props;
    const [selected, setSelected] = React.useState(props.selected || options[0]['value'])

    const onPress = value => {
        onSelect?.(value)
        setSelected(value)
    }

    const renderItem = ({item, index}) => {
        const { label, value } = item;
        const is_selected = selected === value
        return <TabBlock {...item} is_selected={is_selected} onSelect={() => onPress(value)}/>
    }

    return (
        <View style={props.style}>
            <FlatList
                data={options}
                renderItem={renderItem}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                bounces={false}
                />
        </View>
    )
}

const TabBlock = props => {
    const {
        is_selected,
        label,
        value,
        onSelect
    } = props;
    const { styles, theme } = useStyles(stylesheet)

    const animatedStyle = useAnimatedStyle(() => {
        return {
            borderBottomWidth: 2,
            borderBottomColor: withTiming(interpolateColor(
                is_selected,
                [0,1],
                ['transparent', theme.colors.brand.solid_100 ]
            ), ANIMATION_DURATION)
        }
    })

    const animatedTextStyle = useAnimatedStyle(() => {
        return {
            ...theme.text.code.md,
            fontWeight: withTiming(is_selected ? 700 : 400, ANIMATION_DURATION),
            color: withTiming(interpolateColor(
                is_selected,
                [0,1],
                [theme.colors.base.text_300, theme.colors.brand.solid_100]
            ), ANIMATION_DURATION)
        }
    })

    return (
        <Animated.View style={animatedStyle}>
            <Pressable 
                style={[styles.Option]} 
                onPress={() => !is_selected && onSelect?.(value)}>
                <Animated.Text style={animatedTextStyle}>
                    {label}
                </Animated.Text>
            </Pressable>
        </Animated.View>
    )
}

const stylesheet = createStyleSheet(theme => {
    return {
        Container: {
            borderWidth: 0,
            borderColor: 'red',
            // gap: theme.spacing.md,
        },
        Option: {
            alignItems: 'center',
            justifyContent: 'center',
            padding: theme.spacing.sm,
            borderTopLeftRadius: theme.border_radius.md,
            borderTopRightRadius: theme.border_radius.md,
            borderBottomWidth: 2,
            borderBottomColor: 'transparent'
        },
        SelectedOption: {
            borderBottomColor: theme.colors.brand.solid_100
        }
    }
});
