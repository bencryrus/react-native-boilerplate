import React from "react";
import { StyleSheet, View, Text } from 'react-native'
import { useSelector } from "react-redux";

import Ripple from 'react-native-material-ripple';
import { Icon } from "@rneui/themed";

export const FAB = props => {
    const {
        position='right',
        offset=0,
        label,
        icon='plus-thick',
        onPress,
    } = props;
    const theme = useSelector(state => state.db.theme)
    const primaryColor = theme['--primary']
    const textColor = theme['--on-primary']

    const styles = StyleSheet.create({
        Container: {
            position: 'absolute',
            bottom: theme['--spacing'],
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
            justifyContent: 'center',
            ...theme['--shadow']
        },
        Label: {
            fontSize: theme['--title-medium-fontSize'],
            lineHeight: theme['--title-medium-lineHeight'],
            color: textColor,
            textTransform: 'capitalize',
            marginHorizontal: 4,
            fontWeight: 'bold',
            fontFamily: theme['--title-large-font']
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
                rippleColor={theme['--primary-container']}
                rippleDuration={300}
                >
                <Icon name={icon} type={'material-community'} size={24} color={theme['--on-primary-container']}/>
                {label && <Text style={styles.Label}>{label}</Text>}
            </Ripple>
        </View>
    )
}