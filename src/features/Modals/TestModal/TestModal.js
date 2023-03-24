import React from 'react'
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

import { View, Text } from 'components'

const TestModal = props => {
    const theme = useSelector(state => state.db.theme)
    const styles = StyleSheet.create({
        Container: {
            backgroundColor: theme['--bg-color'],
            borderWidth: 2,
            borderColor: theme['--primary-color'],
            borderRadius: 5,
            padding: theme['--padding']
        }
    })

    return (
        <View styles={styles.Container}>
            <Text>TestModal</Text>
        </View>
    )
}

export default TestModal