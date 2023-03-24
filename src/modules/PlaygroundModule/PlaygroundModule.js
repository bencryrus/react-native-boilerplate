import React from 'react'
import { StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { View, Text, Button, Chip, Collapsible, Switch, FAB } from 'components' 
import { RatePopup } from 'features'

import * as actions from 'store/actions'
import { themes } from 'themes'
import _ from 'lodash'
import { materialColors, fonts, layouts } from 'resources'

const randomChips = _.sampleSize(Object.keys(materialColors),50)

const PlaygroundModule = props => {
    // const theme = useSelector(state => state.db.theme)
    const theme = useSelector(state => state.db.theme)
    const preferences = useSelector(state => state.db.preferences)
    const [showChips, setChips] = React.useState(false)

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
            width: '100%',
            borderWidth: 0,
            borderColor: 'red',
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            padding: theme['--container-padding']
        },
        Button: {
            backgroundColor: theme['--primary-color'],
            color: theme['--primary-text-color'],
            marginVertical: theme['--margin'],
            // width: '30%'
        }
    })

    const [isActive, setActive] = React.useState(false)

    return (
        <View styles={styles.Container}>
            <View styles={styles.Body}>
                <Text styles={{fontSize: theme['--title-size']}}>PlaygroundModule</Text>
                <Button label='Modal' styles={styles.Button} onPress={() => dispatch(actions.setModal(<View styles={{height: 100}}></View>))}/>
                <Button label='Overlay' styles={styles.Button} onPress={() => dispatch(actions.setOverlay('ABOUT'))}/>

                <View styles={theme.rowCenter}>
                    <Text styles={{marginRight: 8, textTransform: 'capitalize'}}>{preferences['theme']}</Text>
                    <Button label='Random theme' icon='shuffle' styles={styles.Button} onPress={() => dispatch(actions.setPreferences({...preferences, theme: Object.keys(themes)[_.random(0, Object.keys(themes).length-1)]}))}/>
                </View>
                
                <View styles={theme.rowCenter}>
                    <Text styles={{marginRight: 8}}>{preferences['font']}</Text>
                    <Button label='Random font' icon='shuffle' styles={styles.Button} onPress={() => dispatch(actions.setPreferences({...preferences, font: fonts[_.random(0, fonts.length-1)]}))}/>
                </View>
                

                <Button label='Toggle chips' styles={styles.Button} onPress={() => setChips(!showChips)}/>
                <Collapsible collapsed={!showChips}>
                    <View styles={{borderWidth: 0, marginTop: 8}}>
                        <ScrollView style={{maxHeight: 300}}>
                            <View styles={{flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-end'}}>
                                {randomChips.map(key => (
                                    <Chip key={key} label={key} color={materialColors[key]}/>
                                ))}
                            </View>
                        </ScrollView>
                    </View>
                </Collapsible>

                <Switch 
                    isActive={isActive} 
                    onPress={() => setActive(!isActive)} 
                    // color={materialColors[Object.keys(materialColors)[3]]}
                    />
                <Text>{`${isActive}`}</Text>

                <FAB 
                    onPress={() => dispatch(actions.setOverlay('POPUP', { element: <RatePopup/> }))}
                    label='Test' 
                    position='left'
                    offset={16}
                    // color={materialColors['--red-400']}
                    />
            </View>
        </View>
    )
}

export default PlaygroundModule