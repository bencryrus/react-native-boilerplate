import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'

import Ripple from 'react-native-material-ripple';
import { Icon } from "@rneui/themed";

import { getShadeColor } from 'utils'

export const Check = props => {
    const {
        selected=true,
        onPress,
        disabled=false,
        size=20,
        label,
        labelPosition='after'
    } = props;
    const theme = useSelector(state => state.db.theme)
    const color = props.color || theme['--outline']
    const styles = StyleSheet.create({
        Container: {
            borderWidth: 2,
            borderColor: color,
            borderRadius: 4,
            width: size,
            aspectRatio: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: selected ? getShadeColor(color,1,0.2) : 'transparent',
            ...props.styles
        },
        Label: {
            color: theme['--on-surface'],
            marginLeft: labelPosition === 'after' ? theme['--spacing'] : 0,
            marginRight: labelPosition === 'before' ? theme['--spacing'] : 0
        }
    })

    return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {label && labelPosition === 'before' && <Text style={styles.Label}>{label}</Text>}
            <Ripple style={styles.Container} onPress={!disabled && onPress}>
                {selected && <Icon name={'check-bold'} type={'material-community'} size={size*0.6} color={color}/>}
            </Ripple>
            {label && labelPosition === 'after' && <Text style={styles.Label}>{label}</Text>}
        </View>
    )
}