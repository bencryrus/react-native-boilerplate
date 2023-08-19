import React from 'react';
import { StyleSheet, Text, Pressable } from 'react-native'
import { useSelector } from 'react-redux' 

export const CustomText = props => {
    const theme = useSelector(state => state.db.theme)

    const styles = StyleSheet.create({
        color: theme['--on-surface'],
        fontSize: theme['--body-medium-fontSize'],
        fontFamily: theme['--body-medium-font'],
        ...props.styles,
        borderWidth: 0,
    });

    if(props.onPress) {
        return (
            <Pressable onPress={props.onPress} styles={{ borderRadius: 5 }}>
                <Text style={styles} {...props}>{props.children}</Text>
            </Pressable>
        )
    } else {
        return <Text style={styles} {...props}>{props.children}</Text>
    }
}