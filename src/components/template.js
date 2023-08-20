import React from 'react'
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

import { View, Text } from 'components'

export const ComponentName = props => {
    const {

    } = props;
    const theme = useSelector(state => state.db.theme)
    const styles = StyleSheet.create({
        Container: {

        }
    })

    return (
        <View styles={styles.Container}>

        </View>
    )
}