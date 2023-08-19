import React from "react"
import { StyleSheet, View, Text } from 'react-native'
import { useSelector } from "react-redux"

export const TestBlock = props => {
    const {

    } = props;
    const theme = useSelector(state => state.db.theme)
    const styles = StyleSheet.create({
        Container: {

        }
    })

    return (
        <View styles={styles.Container}>
            <Text>TestBlock</Text>
        </View>
    )
}