import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { View, Text, Button } from 'components' 

import * as actions from 'store/actions'

const AboutModule = props => {
    const theme = useSelector(state => state.db.theme)
    const dispatch = useDispatch()
    const insets = useSafeAreaInsets()
    const styles = StyleSheet.create({
        Container: {
            flex: 1,
            backgroundColor: theme['--bg-color'],
            paddingTop: insets.top
        },
        Header: {
            flexDirection: 'row',
        },
        Body: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }
    })
    return (
        <View styles={styles.Container}>

            <View styles={styles.Header}>
                <Button icon='chevron-left' onPress={() => dispatch(actions.setOverlay())}/>
            </View>
            <View styles={styles.Body}>
                <Text>AboutModule</Text>
            </View>
        </View>
    )
}

export default AboutModule