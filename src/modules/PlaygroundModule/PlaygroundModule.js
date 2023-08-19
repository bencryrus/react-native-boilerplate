import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import { View, Text, Button, Chip, Collapsible, Switch, FAB, TestBlock } from 'components' 
import { NavBar } from '../NavBar'

import * as actions from 'store/actions'
import _ from 'lodash'
import { material_colors, accent_colors } from 'constants'

// const randomChips = _.sampleSize(Object.keys(material_colors),50)
const randomChips = Object.keys(material_colors)

const PlaygroundModule = props => {
    const theme = useSelector(state => state.db.theme)
    const preferences = useSelector(state => state.db.preferences)
    const [showChips, setChips] = React.useState(false)
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const styles = StyleSheet.create({
        Container: {
            flex: 1,
            backgroundColor: theme['--surface'],
            padding: theme['--spacing']
        },
        Header: {
            flexDirection: 'row',
        },
        Body: {
            width: '100%',
            borderWidth: 0,
            borderColor: 'red',
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            padding: theme['--container-padding']
        },
        Button: {
            backgroundColor: theme['--surface-container-high'],
            color: theme['--on-surface'],
            marginBottom: theme['--spacing'],
            // borderWidth: 2,
            // borderColor: theme['--outline-variant'],
        },
        Wrapper: {
            ...theme.shadow,

            backgroundColor: theme['--surface-container'], 
            borderWidth: 0, 
            borderColor: theme['--outline-variant'], 
            width: 200, height: 200, borderRadius: 5
        }
    })

    const [isActive, setActive] = React.useState(false)

    return (
        <View styles={styles.Container}>
            <View styles={styles.Body}>
                <Text styles={{fontSize: theme['--title-size']}}>PlaygroundModule</Text>
                <Button label='Modal' styles={styles.Button} onPress={() => dispatch(actions.setModal(<View styles={{height: 100}}></View>))}/>
                <Button label='Overlay' styles={styles.Button} onPress={() => navigation.navigate('TestModule')}/>

                <View styles={theme.rowCenter}>
                    <Text styles={{marginRight: 8, textTransform: 'capitalize'}}>{preferences['theme']}</Text>
                    <Button label='Toggle theme' icon='shuffle' styles={styles.Button} onPress={() => dispatch(actions.setPreferences({...preferences, theme: preferences['theme'] === 'dark' ? 'light' : 'dark'}))}/>
                </View>
                

                <Button label='Toggle chips' styles={styles.Button} onPress={() => setChips(!showChips)}/>
                <Collapsible collapsed={!showChips}>
                    <View styles={{borderWidth: 0, marginTop: 8}}>
                        <ScrollView style={{maxHeight: 300}}>
                            <View styles={{flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-end'}}>
                                {randomChips.map(key => (
                                    <Chip key={key} label={key} color={material_colors[key]}/>
                                ))}
                            </View>
                        </ScrollView>
                    </View>
                </Collapsible>

                <View styles={{flexDirection:'row', alignItems: 'center'}}>
                    <Text>{`${isActive}`}</Text>
                    <Switch isActive={isActive} onPress={() => setActive(!isActive)}/>
                </View>

                <View styles={styles.Wrapper}>
                    <TestBlock/>
                </View>

                <FAB 
                    // onPress={() => dispatch(actions.setOverlay('POPUP', { element: <RatePopup/> }))}
                    // label='Save' 
                    // icon='plus'
                    position='left'
                    offset={16}
                    />
            </View>
            <NavBar/>
        </View>
    )
}

export default PlaygroundModule