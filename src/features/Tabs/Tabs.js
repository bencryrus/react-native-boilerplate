import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'

import { Text, View } from 'components'
import Animated, { useAnimatedStyle, withTiming, Easing, useSharedValue } from 'react-native-reanimated'

import { useSelector } from 'react-redux' 
import { hextoRGB } from 'utils'

const window = Dimensions.get('window')

const Tabs = props => {
    const {
        options=[],
        initial=0,
        onSelect,
        width=window['width'],
    } = props;
    const n = options.length
    const theme = useSelector(state => state.db.theme)
    const styles = StyleSheet.create({
        Container: {
            flexDirection: 'row',
            marginTop: 8,
            marginBottom: 8,
            borderBottomWidth: 0,
            borderColor: theme['--secondary-color'],
            backgroundColor: theme['--bg-color'],
            borderRadius: 5,
            // alignItems: 'center',
            // justifyContent: 'center'
        },
        Wrapper: {
            alignItems: 'center',
            justifyContent: 'center',
            padding: 12,
            borderRadius: 5,
        },
        SelectedWrapper: {
            backgroundColor: theme['--primary-color']
        },
        Title: {
            fontWeight: 'bold',
            color: theme['--text-color'],
            textTransform: 'capitalize'
        },
        UnfocusedTitle: {
            color: theme['--text-color'],
            textTransform: 'capitalize'
        },
        Subtitle: {
            color: theme['--text-color'],
            fontSize: 12
        },
        Indicator: {
            width: width/n,
            padding: 8,
            borderRadius: 5,
            backgroundColor: theme['--primary-color'],
            position: 'absolute',
            height: '100%'
        }
    })

    const tab = useSharedValue(initial)

    const onSelectTab = (newTab) => {
        tab.value = newTab
        onSelect && onSelect(options[newTab])
    }

    const getBlocks = () => {
        return options.map((option, index) => {
            const isSelected = index === tab

            return (
                <View key={`tab_${index}`} styles={[styles.Wrapper]} 
                    containerStyle={{flex: 0, width: width/n, borderWidth: 0}} 
                    onPress={() => onSelectTab(index)}>
                    <Text styles={isSelected ? styles.Title : styles.UnfocusedTitle} numberOfLines={1}>{option['label']}</Text>
                </View>
            )
        })
    }

    const indicatorStyle = useAnimatedStyle(() => {
        return {
            // position: 'absolute',
            // left: 0,
            transform: [{
                translateX: withTiming(
                    tab.value === 0 ? 0 : (width/n)*tab.value,
                    { duration: 300, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }
                )
            }]
        }
    })

    return (
        <View styles={styles.Container}>
            <Animated.View style={[styles.Indicator, indicatorStyle]}/>
            {getBlocks()}
        </View>
    )
}

export default Tabs