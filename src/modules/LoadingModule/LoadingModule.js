import React from 'react'
import { StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { View, Text, Spinner } from 'components'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

import * as actions from 'store/actions'
import { storage } from 'store'

const LoadingModule = props => {
    const theme = useSelector(state => state.db.theme)
    const dispatch = useDispatch()
    const userid = useSelector(state => state.db.userid)
    const status = useSelector(state => state.db.status)
    const [showRetry, setRetry] = React.useState(false)
    const styles = StyleSheet.create({
        Container: {
            backgroundColor: theme['--primary'],
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }
    })

    React.useEffect(() => {
        load()
    }, [status])

    const load = () => {
        storage.getItem('@id')
        .then(id => {
            if(id) { 
                dispatch(actions.loadData({
                    callback: (success) => {
                        if(success) {
                            setTimeout(() => {
                                props.navigation.navigate('PlaygroundModule')
                            }, 1000)
                        } else {
                            setRetry(true)
                        }
                    }
                }))
            } else {
                props.navigation.navigate('OnboardingModule')
            }
        })
        
    }

    return (
        <View styles={styles.Container}>
            {!userid && 
            <Animated.View entering={FadeIn} exiting={FadeOut} style={{marginBottom: 8}}>
                <Text styles={{color: theme['--on-primary']}}>Getting things ready</Text>
            </Animated.View>}

            <Spinner/>
        </View>
    )
}

export default LoadingModule