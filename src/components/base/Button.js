import React from 'react';
import { StyleSheet, View, Text } from 'react-native'
import { useSelector } from 'react-redux'

import Ripple from 'react-native-material-ripple';
import { Icon } from "@rneui/themed";
import { ActivityIndicator } from 'react-native-paper';

export const CustomButton = (props) => {
    const {
        label,
        icon,
        loading = false,
        onPress=() => {},
        onLongPress,
        spinnerSize=16,
        spinnerColor
    } = props
    const theme = useSelector(state => state.db.theme)
    const styles = StyleSheet.create({
        Container: {
            backgroundColor: theme['--primary'],
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: theme['--spacing-small'],
            paddingHorizontal: theme['--spacing'],
            ...props.styles,
        },
        Label: {
            color: props.styles && props.styles.color ? props.styles.color : theme['--on-primary'],
            fontSize: props.styles && props.styles.fontSize ? props.styles.fontSize : theme['--body-medium-fontSize'],
            marginRight: icon ? 4 : 0
        },
        Icon: {
            color: props.styles && props.styles.color ? props.styles.color : theme['--on-primary'],
            size: props.styles && props.styles.fontSize ? props.styles.fontSize : theme['--body-medium-fontSize'],
        }
    });

    return (
        <Ripple
            onPress={onPress}
            onLongPress={onLongPress}
            rippleColor={theme['--surface']}
            rippleDuration={300}
            style={styles.Container}
            >
            <View style={{flexDirection: 'row', alignItems: 'center', borderWidth: 0}}>
                <View style={{marginRight: !label ? 0 : icon ? theme['--spacing-small'] : loading ? theme['--spacing-small'] : 0}}>
                    {loading ? <ActivityIndicator animating={true} color={spinnerColor || theme['--on-primary']} size={spinnerSize}/>
                    : icon && typeof icon === 'string' ? <Icon name={icon} type={'material-community'} size={styles.Icon.size} color={styles.Icon.color}/> 
                    : icon ? icon
                    : null}
                </View>
                {label && <Text style={styles.Label}>{label}</Text>}
            </View>
        </Ripple>
    )
}