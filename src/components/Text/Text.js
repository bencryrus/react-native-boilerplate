import React from 'react';
import { StyleSheet, Text, Pressable } from 'react-native'
import { useSelector } from 'react-redux' 

const CustomText = props => {
    const theme = useSelector(state => state.db.theme)
    const preferences = useSelector(state => state.db.preferences)

    const styles = StyleSheet.create({
        color: theme['--text-color'],
        fontSize: theme['--font-size'],
        // fontFamily: 'SpaceGrotesk',
        fontFamily: preferences['font'],
        ...props.styles,
        borderWidth: 0,
    });
    // console.log(preferences['font'])
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



export default CustomText