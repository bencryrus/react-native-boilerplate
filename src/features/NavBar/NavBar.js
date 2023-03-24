import React from 'react'
import { StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { View, Text, Icon } from 'components' 
import Collapsible from 'react-native-collapsible';

import * as actions from 'store/actions'

const Option = props => {
    const {
        id,
        label='Tab',
        icon,
        isSelected,
        navigation,
    } = props;
    const dispatch = useDispatch()
    const theme = useSelector(state => state.db.theme)
    const styles = StyleSheet.create({
        Container: {
            borderWidth: 0,
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
        },
        Label: {
            textTransform: 'uppercase',
            color: isSelected ? theme['--text-color'] : theme['--text-color-300'],
            fontWeight: 'bold',
            fontSize: 12,
            marginBottom: 4
        }
    })
    return (
        <View 
            styles={styles.Container} 
            containerStyle={{flex: 1, height: '100%'}}
            onPress={() => navigation.navigate(id)}
            >
            
            <View styles={{justifyContent: 'center', alignItems: 'center', flex: 0, }}>
                <Text styles={styles.Label} numberOfLines={1}>{label}</Text>
                <Collapsible collapsed={!isSelected}>
                    <Icon icon={icon}/>
                </Collapsible>
            </View>
            
        </View>
    )
} 

const options = {
    PLAYGROUND: { label: 'Test', icon: 'code-tags' },
    SETTINGS: { label: 'Settings', icon: 'cog' }
}

const NavBar = (props) => {
    const module = useSelector(state => state.content.module)
    const theme = useSelector(state => state.db.theme)
    const insets = useSafeAreaInsets()
    const styles = StyleSheet.create({
        Container: {
            backgroundColor: theme['--bg-color'],
            borderTopWidth: 0,
            borderTopColor: theme['--text-color-100'],
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-around',
            flexDirection: 'row',
            marginBottom: theme['--margin'],
            paddingTop: 0,
            height: insets.bottom + 46,
        }
    })

    return (
        <View styles={styles.Container}>
            {props.state.routes.map((route,index) => {
                const { key, name } = route
                return <Option
                    key={key}
                    id={name}
                    {...options[name]}
                    navigation={props.navigation}
                    isSelected={props.state.index === index}
                    />
            })}
        </View>
    )
}

export default NavBar