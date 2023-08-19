import React from 'react';
import { StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux' 
import Ripple from 'react-native-material-ripple';

export const CustomView = props => {
    const {
        onPress,
        onLongPress,
        disabled
    } = props;
    const theme = useSelector(state => state.db.theme)
    const styles = StyleSheet.create({
        // color: theme['--on-surface'],
        // backgroundColor: 'transparent',
    });

    const onPressHandler = (event) => {
        onPress && onPress(event)
    }

    if(!disabled && onPress) {
        return (
            <Ripple 
                onPress={onPressHandler} 
                onLongPress={onLongPress}
                style={props.containerStyle}
                >
                <View style={props.styles} {...props}/>
            </Ripple>
        )
    } else {
        return (
            <View style={props.styles} {...props}/>
        )
    }
}