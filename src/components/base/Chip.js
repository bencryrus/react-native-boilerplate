import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useSelector } from 'react-redux'

import Ripple from 'react-native-material-ripple';
import { Icon } from "@rneui/themed";
import { hextoRGB, getTextColor, getShadeColor } from 'utils'

export const Chip = props => {
    const {
        label,
        onRemove,
        onPress,
        color='#000000',
        bold=false,
        uppercase=false
    } = props;
    const theme = useSelector(state => state.db.theme)
    const styles = StyleSheet.create({
        Container: {
            backgroundColor: getShadeColor(color,1,0.2),
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 2,
            borderColor: color,
            borderRadius: 50,
            paddingVertical: theme['--spacing-smallest'],
            paddingHorizontal: theme['--spacing'],
            paddingRight: onRemove ? 8 : null,
            marginRight: theme['--spacing-small'],
            marginBottom: theme['--spacing-small'],
        },
        Label: {
            color: theme['--on-surface'],
            marginRight: onRemove ? theme['--spacing-smallest'] : 0,
            fontSize: 12,
        }
    })

    const onSelect = () => {
        if(onRemove) {
            onRemove()
        } else if (onPress) {
            onPress()
        }
    }

    return (
        <View style={{flexWrap: 'wrap'}}>
            <Ripple 
                style={styles.Container} 
                disabled={!onPress && !onRemove}
                onPress={onSelect}>
                <Text style={styles.Label}>{label}</Text>
                {onRemove && <Icon name='close-circle' type={'material-community'} size={theme['--body-medium-fontSize']} color={color ? color : theme['--on-surface']}/>}
            </Ripple>
        </View>
        
    )
}