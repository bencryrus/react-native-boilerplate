import React from 'react';
import { StyleSheet, Text, Pressable } from 'react-native'
import { useSelector } from 'react-redux' 

export const CustomText = props => {
    const {
        type='normal'
    } = props;
    const theme = useSelector(state => state.db.theme)
    const styles = StyleSheet.create({
        normal: {
            color: theme['--on-surface'],
            fontSize: theme['--body-medium-fontSize'],
            lineHeight: theme['--body-medium-lineHeight'],
            fontFamily: theme['--body-medium-font'],
            ...props.styles,
        },
        subtitle: {
            color: theme['--on-surface-variant'],
            fontSize: theme['--body-small-fontSize'],
            lineHeight: theme['--body-small-lineHeight'],
            fontFamily: theme['--body-small-font'],
            ...props.styles,
        },
        title: {
            color: theme['--on-surface'],
            fontSize: theme['--title-large-fontSize'],
            lineHeight: theme['--title-large-lineHeight'],
            fontFamily: theme['--title-large-font'],
            fontWeight: 'bold',
            ...props.styles,
        }
    })

    if(props.onPress) {
        return (
            <Pressable onPress={props.onPress} styles={{ borderRadius: 5 }}>
                <Text style={styles[type] || styles.normal} {...props}>{props.children}</Text>
            </Pressable>
        )
    } else {
        return <Text style={styles[type] || styles.normal} {...props}>{props.children}</Text>
    }
}