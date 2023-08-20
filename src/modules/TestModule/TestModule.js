import React from 'react'
import { StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import { View, Text, Button, Check, Chip } from 'components' 
import { Header } from '../Header'
import { NavBar } from '../NavBar'

import _ from 'lodash'

const TestModule = props => {
    const dispatch = useDispatch()
    const theme = useSelector(state => state.db.theme)
    const preferences = useSelector(state => state.db.preferences)
    const navigation = useNavigation()
    const styles = StyleSheet.create({
        Container: {
            padding: theme['--spacing'],
            flex: 1,
        },
        Body: {
            flex: 1,
        }
    })
    const [selected, setSelected] = React.useState(false)
    return (
        <View styles={styles.Container}>
            <Header subtitle='Test' trailing={<Button icon='dots-horizontal'/>}/>
            <View styles={styles.Body}>
                <Text>TestModule</Text>
            </View>
            <NavBar/>
        </View>
    )
}

export default TestModule