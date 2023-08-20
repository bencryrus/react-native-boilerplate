import React from "react";
import { StyleSheet, View, Text } from 'react-native'
import { useSelector } from "react-redux";
import Ripple from 'react-native-material-ripple';
import { Icon } from "@rneui/themed";

export const ListTile = props => {
    const {
        label,
        subtitle,
        disabled,
        leading,
        leadingColor,
        trailing,
        trailingColor,
        onPress,
        onLongPress,
    } = props;
    const theme = useSelector(state => state.db.theme)
    const styles = StyleSheet.create({
        Container: {
            flexDirection: 'row',
            width: '100%',
            borderWidth: 0,
            // backgroundColor: theme['--surface-container'],
            borderRadius: theme['--border-radius'],
            padding: theme['--spacing-small'],
            alignItems: 'center',
            ...props.styles
        },
        Label: {
            color: theme['--on-surface'],
            fontSize: theme['--body-medium-fontSize'],
            lineHeight: theme['--body-medium-lineHeight'],
            fontFamily: theme['--body-medium-font'],
            fontWeight: subtitle ? 'bold' : 'normal'
        },
        Subtitle: {
            color: theme['--on-surface-variant'],
            fontSize: theme['--body-small-fontSize'],
            lineHeight: theme['--body-small-lineHeight'],
            fontFamily: theme['--body-small-font'],
        }
    })

    if(trailing && typeof trailing !== 'string') {
        return (
            <View style={styles.Container}>
    
                {leading && 
                <Icon name={leading} 
                    type={'material-community'}
                    size={20} 
                    color={leadingColor || theme['--on-surface']}
                    containerStyle={{ marginRight: theme['--spacing'] }}
                    />}
                
                <View style={{flex: 1}}>
                    <Text style={styles.Label}>{label}</Text>
                    {subtitle && <Text style={styles.Subtitle}>{subtitle}</Text>}
                </View>
    
                {trailing}
            </View>
        )
    } else {
        return (
            <Ripple
                onPress={onPress}
                onLongPress={onLongPress}
                rippleColor={theme['--on-surface']}
                rippleDuration={300}
                style={styles.Container}
                rippleContainerBorderRadius={theme['--border-radius']}
                disabled={disabled}>
    
                {leading && 
                <Icon name={leading} 
                    type={'material-community'}
                    size={20} 
                    color={leadingColor || theme['--on-surface']}
                    containerStyle={{ marginRight: theme['--spacing'] }}
                    />}
                
                <View style={{flex: 1}}>
                    <Text style={styles.Label}>{label}</Text>
                    {subtitle && <Text style={styles.Subtitle}>{subtitle}</Text>}
                </View>
    
                {trailing &&
                <Icon name={trailing} 
                    type={'material-community'}
                    size={20} 
                    color={trailingColor || leadingColor || theme['--on-surface']}
                    containerStyle={{ marginLeft: theme['--spacing'] }}
                    />}
            </Ripple>
        )
    }

    
}