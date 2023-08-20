import React from 'react'
import { StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import { View, Text, Button, Check, Chip, Switch } from 'components' 

import _ from 'lodash'
import * as actions from 'store/actions'

const TestModule = props => {
    const dispatch = useDispatch()
    const theme = useSelector(state => state.db.theme)
    const preferences = useSelector(state => state.db.preferences)
    const navigation = useNavigation()
    const styles = StyleSheet.create({
        Container: {
            padding: theme['--spacing'],
        }
    })
    const [selected, setSelected] = React.useState(false)
    return (
        <View styles={styles.Container}>
            <Button 
                onPress={() => navigation.goBack()} 
                icon='chevron-left' label='Back' 
                justify='start'
                styles={{backgroundColor: theme['--surface'], fontWeight: 'normal'}}
                shadow={false}
                />
            
            <Check onPress={() => setSelected(old => !old)} selected={selected} color={theme['--priority-high']} size={30} label={`${selected}`}/>
            
            <View styles={{flexWrap: 'wrap', flexDirection: 'row', borderWidth: 1, borderColor: 'red'}}>
                <Chip label='Test' color={theme['--priority-high']} onRemove={() => {}}/>
                <Chip label='Test' color={theme['--priority-high']} onRemove={() => {}}/>
                <Chip label='Test' color={theme['--amber-100']} onRemove={() => {}}/>
            </View>
            
        </View>
    )
}

export default TestModule