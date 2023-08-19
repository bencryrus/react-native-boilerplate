import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useSelector } from 'react-redux'

import Ripple from 'react-native-material-ripple';
import { Icon } from "@rneui/themed";
import { hextoRGB, getTextColor, getShadeColor } from 'utils'

export const Chip = props => {
    const {
        label,
        onClose,
        onPress,
        color= '#000000',
        bold=false,
        uppercase=false
    } = props;
    const theme = useSelector(state => state.db.theme)
    const styles = StyleSheet.create({
        Container: {
            // backgroundColor: color,
            backgroundColor: getShadeColor(color,1,0.2),
            // backgroundColor: theme['--surface-container'],
            // backgroundColor: 'red',
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 2,
            borderColor: color,
            // borderColor:  getShadeColor(color,1,0.4),
            borderRadius: 50,
            paddingVertical: 4,
            paddingHorizontal: 16,
            paddingRight: onClose ? 8 : null,
            marginRight: 4,
            marginBottom: 4
        },
        Label: {
            // color,
            color: theme['--on-surface'],
            // color: theme['--on-surface-variant'],
            marginRight: onClose ? 4 : 0,
            fontSize: 12,
            fontWeight: bold ? 'bold' : 'normal',
            textTransform: uppercase ? 'uppercase' : 'none'
        }
    })

    const onSelect = () => {
        if(onClose) {
            onClose()
        } else if (onPress) {
            onPress()
        }
    }

    return (
        <Ripple style={styles.Container} disabled={!onPress && !onClose}
            onPress={onSelect}>
            <Text style={styles.Label}>{label}</Text>

            {onClose && <Icon name='close-circle' type={'material-community'}
                size={20} color={color ? color : theme['--on-surface']}/>}
        </Ripple>
    )
}