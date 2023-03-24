import React from 'react';
import { StyleSheet, View, Text } from 'react-native'
import { useSelector } from 'react-redux'

import Ripple from 'react-native-material-ripple';
import { Icon } from "@rneui/themed";
import { ActivityIndicator } from 'react-native-paper';

import { getTextColor } from 'utils'

function CustomButton(props) {
    const {
        label,
        icon,
        loading = false,
        onPress=() => {},
        onLongPress,
        size=36,
        spinnerSize=16,
        spinnerColor
    } = props
    const theme = useSelector(state => state.db.theme)
    const styles = StyleSheet.create({
        Container: {
            backgroundColor: 'transparent',
            minWidth: size,
            minHeight: size,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: icon ? 8 : 12,
            ...props.styles,
        },
        Label: {
            color: props.styles && props.styles.color ? props.styles.color : theme['--text-color'],
            fontSize: props.styles && props.styles.fontSize ? props.styles.fontSize : theme['--font-size'],
            marginRight: icon ? 4 : 0
        },
        Icon: {
            color: props.styles && props.styles.color ? props.styles.color : theme['--text-color'],
            size: props.styles && props.styles.fontSize ? props.styles.fontSize : theme['--font-size'],
        }
    });
    
    return (
        <Ripple
            onPress={onPress}
            onLongPress={onLongPress}
            rippleColor={theme['--bg-color']}
            rippleCentered={true}
            rippleDuration={400}
            style={styles.Container}
            >
            <View style={{flexDirection: 'row', alignItems: 'center', borderWidth: 0}}>
                <View style={{marginRight: !label ? 0 : icon ? 8 : loading ? 8 : 0}}>
                    {loading ? <ActivityIndicator animating={true} color={spinnerColor || theme['--text-color']} size={spinnerSize}/>
                    : icon && typeof icon === 'string' ? <Icon name={icon} type={'material-community'} size={styles.Icon.size} color={styles.Icon.color}/> 
                    : icon ? icon
                    : null}
                </View>
                {label && <Text style={styles.Label}>{label}</Text>}
            </View>
        </Ripple>
    )
}

export default CustomButton;