import React from "react";
import { StyleSheet, View, Text } from 'react-native'
import { useSelector } from "react-redux";

import Ripple from 'react-native-material-ripple';
import { Icon } from "@rneui/themed";

import { hextoRGB, getTextColor } from 'utils'

const FAB = props => {
    const {
        position='right',
        offset=8,
        label,
        icon='plus',
        size=20,
        onPress,
        color
    } = props;
    const theme = useSelector(state => state.db.theme)
    const primaryColor = color || theme['--primary-color']
    const textColor = getTextColor(primaryColor)

    const styles = StyleSheet.create({
        Container: {
            position: 'absolute',
            bottom: offset,
            right: position === 'right' ? offset : null,
            left: position === 'right' ? null : offset
        },
        Button: {
            backgroundColor: primaryColor,
            padding: 8,
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 2,
            borderColor: hextoRGB(textColor, 0.2)
        },
        Label: {
            fontSize: theme['--font-size'],
            color: textColor,
            textTransform: 'capitalize',
            marginHorizontal: 4,
            fontWeight: 'bold'
        },
    })

    const onSelect = () => {
        onPress && onPress()
    }

    return (
        <View style={styles.Container}>
            <Ripple 
                style={styles.Button} 
                onPress={onSelect}
                rippleColor={theme['--bg-color']}
                rippleCentered={true}
                rippleDuration={400}
                >
                <Icon name={icon} type={'material-community'} size={size} color={textColor}/>
                {label && <Text style={styles.Label}>{label}</Text>}
            </Ripple>
        </View>
    )
}

export default FAB