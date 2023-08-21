import React from 'react';
import { StyleSheet, View, Text } from 'react-native'
import { useSelector } from 'react-redux'

import Ripple from 'react-native-material-ripple';
import { Icon } from "@rneui/themed";
import { ActivityIndicator } from 'react-native-paper';

const justifyRef = {
    center: 'center',
    start: 'flex-start',
    end: 'flex-end'
}

export const CustomButton = (props) => {
    const {
        label,
        icon,
        loading=false,
        onPress=() => {},
        onLongPress,
        spinnerSize=16,
        spinnerColor,
        disabled=false,
        styles={},
        justify='center',
        shadow=true
    } = props
    const theme = useSelector(state => state.db.theme)
    const _styles = StyleSheet.create({
        Container: {
            backgroundColor: theme['--primary'],
            borderRadius: theme['--border-radius'],
            alignItems: 'center',
            justifyContent: justifyRef[justify] || 'center',
            paddingVertical: theme['--spacing-small'],
            paddingHorizontal: theme['--spacing'],
            flexDirection: 'row',
            opacity: disabled ? 0.5 : 1,
            ...styles,
        },
        Label: {
            color: styles.color || theme['--on-primary'],
            fontSize: styles.fontSize || theme['--label-large-fontSize'],
            lineHeight: theme['--label-large-lineHeight'],
            marginRight: icon ? theme['--spacing-smallest'] : 0,
            // fontWeight: styles.fontWeight || 'bold'
        },
        Icon: {
            color: styles.color || theme['--on-primary'],
            size: styles.fontSize || theme['--label-large-fontSize'],
        }
    });

    return (
        <Ripple
            onPress={onPress}
            onLongPress={onLongPress}
            rippleColor={theme['--on-surface']}
            rippleDuration={300}
            style={[_styles.Container, shadow ? theme['--shadow'] : null]}
            rippleContainerBorderRadius={theme['--border-radius']}
            disabled={disabled}
            >
            <View style={{marginRight: icon || loading ? theme['--spacing-small'] : 0}}>
                {loading ? <ActivityIndicator animating={true} color={spinnerColor || theme['--on-primary']} size={spinnerSize}/>
                : icon ? <Icon name={icon} type={'material-community'} size={_styles.Icon.size} color={_styles.Icon.color}/> 
                : null}
            </View>
            <Text style={_styles.Label}>{label}</Text>
        </Ripple>
    )
}