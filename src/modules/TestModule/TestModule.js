import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import { View, Text, Button, Chip, Collapsible, Switch, FAB } from 'components' 

import _ from 'lodash'
import { material_colors } from 'constants'

const randomChips = _.sampleSize(Object.keys(material_colors),50)

const TestModule = props => {
    const navigation = useNavigation()
    const styles = StyleSheet.create({
        Container: {

        }
    })
    return (
        <View styles={styles.Container}>
            <Button onPress={() => navigation.goBack()} icon='chevron-left'/>
        </View>
    )
}

export default TestModule