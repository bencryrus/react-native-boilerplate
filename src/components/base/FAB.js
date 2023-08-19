import React from "react";
import { StyleSheet, View, Text } from 'react-native'
import { useSelector } from "react-redux";

import Ripple from 'react-native-material-ripple';
import { Icon } from "@rneui/themed";

export const FAB = props => {
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
    const primaryColor = theme['--primary']
    const textColor = theme['--on-primary']

    const styles = StyleSheet.create({
        Container: {
            position: 'absolute',
            bottom: offset,
            right: position === 'right' ? offset : null,
            left: position === 'right' ? null : offset
        },
        Button: {
            backgroundColor: primaryColor,
            padding: theme['--spacing'],
            paddingVertical: label ? theme['--spacing-small'] : theme['--spacing'],
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
            ...theme.shadow
        },
        Label: {
            fontSize: theme['--title-medium-fontSize'],
            color: textColor,
            textTransform: 'capitalize',
            marginHorizontal: 4,
            fontWeight: 'bold',
            fontFamily: theme['--title-medium-font']
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
                rippleColor={theme['--surface']}
                rippleCentered={true}
                rippleDuration={400}
                >
                <Icon name={icon} type={'material-community'} size={theme['--headline-medium-fontSize']} color={textColor}/>
                {label && <Text style={styles.Label}>{label}</Text>}
            </Ripple>
        </View>
    )
}