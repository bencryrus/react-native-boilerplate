import React from 'react'
import { StyleSheet, SafeAreaView, FlatList, Dimensions, Image, Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { View, Text, Button, Spinner } from 'components'
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated'

import { useSelector } from 'react-redux' 
import { hextoRGB } from 'utils'
import { storage } from 'store'

const window = Dimensions.get('window')
const WIDTH = window['width']

const PAGES = [
    { 
        title: 'Page 1', 
        subtitle: 'Subtitle 1', 
        // preview: arrivals
    },
    { 
        title: 'Page 2', 
        subtitle: 'Subtitle 2', 
        // preview: preferences
    },
    {
        title: 'Page 3', 
        subtitle: 'Subtitle 3', 
        // preview: bestSide
    }
]

const OnboardingScreen = props => {
    const theme = useSelector(state => state.db.theme)
    const insets = useSafeAreaInsets()
    const ref = React.createRef()
    const scrollIndex = useSharedValue(0)

    const styles = StyleSheet.create({
        Container: {
            backgroundColor: theme['--app-color'],
            flex: 1,
        },
        Page: {
            flex: 1,
            width: WIDTH,
            borderColor: hextoRGB(theme['--text-color'], 0.2),
            padding: 16,
            justifyContent: 'center',
            alignItems: 'center'
        },
        Footer: {
            position: 'absolute',
            bottom: insets.bottom,
            width: WIDTH,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 8,
            marginBottom: Platform.OS === 'android' ? 8 : 0
        },
        Button: {
            backgroundColor: theme['--app-text-color'],
            color: theme['--app-color'],
            borderRadius: 50,
            fontSize: 24
        },
        Image: {
            flex: 1,
            borderWidth: 0,
            borderColor: 'red',
            width: '90%',
            padding: 16,
            marginBottom: 16,
        },
        Title: {
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 30,
            color: theme['--app-text-color']
        },
        Subtitle: {
            textAlign: 'center',
            fontSize: 16,
            color: theme['--app-text-color']

        }
    })

    const [showSpinner, setSpinner] = React.useState(false)

    const onNext = () => {
        const isEnd = scrollIndex.value === (PAGES.length - 1)
        if(isEnd) {
            setSpinner(true)
            setTimeout(() => {
                storage.setItem('@id', 'test')
                .then(res => {
                    props.navigation.navigate('MainScreen')
                })
                .catch(err => {
                    setSpinner(false)
                })
            }, 300)
            
            
        } else {
            const index = scrollIndex.value
            const newIndex = index !== PAGES.length - 1 ? index + 1 : index
            ref.current && ref.current.scrollToIndex({index: newIndex, animated: true})
            scrollIndex.value = newIndex
        }
        
    }

    const onScroll = (event) => {
        let xOffset = event.nativeEvent.contentOffset.x
        const newIndex = Math.round(xOffset/WIDTH)
        if(newIndex !== scrollIndex.value) {
            scrollIndex.value = newIndex
        }
    }

    const renderItem = ({item, index}) => {
        return (
            <View styles={[styles.Page, { borderLeftWidth: index === 0 ? 0 : 0 }]}>
                <View styles={{flex: 1, borderWidth: 0, width: '100%', justifyContent: 'flex-end', alignItems: 'center'}}>
                    <Image style={styles.Image} source={item['preview']} resizeMode='contain'/>
                </View>
                <View styles={{height: '40%', alignItems: 'center', paddingHorizontal: 32}}>
                    <Text styles={styles.Title}>{item['title']}</Text>
                    <Text styles={styles.Subtitle}>{item['subtitle']}</Text>
                </View>
            </View>
        )
    }

    const renderIndicators = () => {
        let output = []
        PAGES.forEach((key, index) => {
            output.push(
                <Animated.View 
                    key={key['title']}
                    style={useAnimatedStyle(() => {
                        return {
                            borderRadius: 50,
                            // width: index === scrollIndex.value ? 16 : 4,
                            width: withTiming(
                                index === scrollIndex.value ? 16 : 4,
                                { duration: 300, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }
                            ),
                            height: 4,
                            backgroundColor: theme[index === scrollIndex.value ? '--app-text-color' : '--app-text-color'],
                            marginHorizontal: 4
                        }
                    })}/>
            )
        })

        return output
    }

    return (
        <SafeAreaView style={styles.Container}>
            <FlatList
                ref={ref}
                data={PAGES}
                renderItem={renderItem}
                onScroll={onScroll}
                horizontal={true}
                getItemLayout={((data,index) => ({length: WIDTH, offset: WIDTH*index, index}))}
                snapToInterval={WIDTH}
                bounces={false}
                snapToAlignment='center'
                decelerationRate='fast'
                showsHorizontalScrollIndicator={false}
                />
            <View styles={styles.Footer}>
                <View styles={theme['row']}>{renderIndicators()}</View>
            <Button icon={'chevron-right'} loading={showSpinner} styles={styles.Button} onPress={onNext} size={48} iconSize={32} spinnerColor={theme['--app-color']}/>
            </View>
        </SafeAreaView>
    )
}

export default OnboardingScreen