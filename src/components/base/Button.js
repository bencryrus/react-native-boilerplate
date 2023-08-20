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
        justify='start',
        shadow=false
    } = props
    const theme = useSelector(state => state.db.theme)
    const iconOnly = icon && !label
    const _styles = StyleSheet.create({
        Container: {
            backgroundColor: theme['--surface'],
            borderRadius: theme['--border-radius'],
            alignItems: 'center',
            justifyContent: justifyRef[justify] || 'center',
            paddingVertical: theme['--spacing-small'],
            paddingHorizontal: iconOnly ? theme['--spacing-small'] : theme['--spacing-small'],
            flexDirection: 'row',
            opacity: disabled ? 0.5 : 1,
            ...styles,
        },
        Label: {
            color: styles.color || theme['--on-primary'],
            fontSize: styles.fontSize || theme['--label-large-fontSize'],
            lineHeight: theme['--label-large-lineHeight'],
            marginRight: icon && !iconOnly ? theme['--spacing-smallest'] : 0,
            fontWeight: styles.fontWeight || 'normal'
        },
        Icon: {
            color: styles.color || theme['--on-primary'],
            size: styles.fontSize || theme['--label-large-fontSize'],
        }
    });

    return (
        <View style={{flexWrap: 'wrap'}}>
            <Ripple
                onPress={onPress}
                onLongPress={onLongPress}
                rippleColor={theme['--on-surface']}
                rippleDuration={300}
                style={[_styles.Container, shadow ? theme['--shadow'] : null]}
                rippleContainerBorderRadius={theme['--border-radius']}
                disabled={disabled}
                >
                <View style={{marginRight: (icon && !iconOnly) || loading ? theme['--spacing-smallest'] : 0}}>
                    {loading ? <ActivityIndicator animating={true} color={spinnerColor || theme['--on-primary']} size={spinnerSize}/>
                    : icon ? <Icon name={icon} type={'material-community'} size={label ? theme['--body-medium-fontSize'] : 20} color={_styles.Icon.color}/> 
                    : null}
                </View>
                <Text style={_styles.Label}>{label}</Text>
            </Ripple>
        </View>
    )
}