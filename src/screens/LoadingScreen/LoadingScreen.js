import React from 'react'
import { StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { View, Text, Button, Spinner } from 'components'
import Animated, { useSharedValue, useAnimatedProps, useAnimatedStyle, FadeIn, FadeOut } from 'react-native-reanimated'

import * as actions from 'store/actions'
import { storage } from 'store'

const LoadingScreen = props => {
    const theme = useSelector(state => state.db.theme)
    const dispatch = useDispatch()
    const userid = useSelector(state => state.db.userid)
    const status = useSelector(state => state.db.status)
    const loaded = useSharedValue(0)
    const [showRetry, setRetry] = React.useState(false)
    const styles = StyleSheet.create({
        Container: {
            backgroundColor: theme['--app-color'],
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }
    })

    React.useEffect(() => {
        load()
        // console.log({storage})
        // storage.setItem('@id', 'test')
        // storage.removeItem('@id')
    }, [status])

    const load = () => {
        storage.getItem('@id')
        .then(id => {
            if(id) { 
                dispatch(actions.loadData({
                    callback: (success) => {
                        if(success) {
                            // props.navigation.navigate('MainScreen')
                            setTimeout(() => {
                                props.navigation.navigate('MainScreen')
                            }, 1000)
                        } else {
                            setRetry(true)
                        }
                    }
                }))
            } else {
                props.navigation.navigate('OnboardingScreen')
            }
        })
        
    }

    return (
        <View styles={styles.Container}>
            {!userid && <Animated.View entering={FadeIn} exiting={FadeOut}>
                <Text styles={{color: theme['--app-text-color']}}>Getting things ready</Text>
            </Animated.View>}

            <Spinner/>
        </View>
    )
}

export default LoadingScreen