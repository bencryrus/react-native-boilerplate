import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import { useDispatch } from 'react-redux'

import { View, Text, Button } from 'components' 

import { useSelector } from 'react-redux' 
import * as actions from 'store/actions'

const SettingsModule = props => {
    const theme = useSelector(state => state.db.theme)
    const dispatch = useDispatch()
    const styles = StyleSheet.create({
        Container: {
            flex: 1,
            backgroundColor: theme['--bg-color']
        },
        Header: {
            flexDirection: 'row',
        },
        Body: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        },
        Button: {
            backgroundColor: theme['--app-color'],
            margin: 8,
            width: '30%'
        }
    })
    return (
        <View styles={styles.Container}>
            <View styles={styles.Body}>
                <Text>SettingsModule</Text>
            </View>
        </View>
    )
}

export default SettingsModule