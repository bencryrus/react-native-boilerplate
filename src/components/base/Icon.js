import React from 'react'
import { Icon } from "@rneui/themed";
import { StyleSheet, Image, Pressable } from 'react-native'
import nodeEmoji from 'node-emoji';

import { Text } from './Text'

import { useSelector } from 'react-redux'

export const CustomIcon = props => {
    const {
        icon,
        styles,
        color,
        size=16,
        iconType='native',
        onPress,
        resizeMode='contain',
        type='material-community'
    } = props;
    const theme = useSelector(state => state.db.theme)
    const updatedStyles = StyleSheet.create({
        Image: {
            width: size,
            height: size,
        },
        Emoji: {
            fontSize: size*0.8,
            // width: size*1.2,
            // height: size*1.2
        }
    })

    let content
    switch(iconType){
        case 'native':
            content = <Icon name={icon} type={type}
                            size={size} color={color ? color : theme['--on-surface']}
                            containerStyle={{ padding:0, margin: 0, width: size || 16, ...styles }}/>
            break
        case 'emoji':
            content = <Text styles={updatedStyles.Emoji}>{nodeEmoji.get(icon)}</Text>
            break
        case 'image':
            content = <Image source={{ uri: icon }} style={[updatedStyles.Image, styles]} resizeMode={resizeMode}/>
            break
        case 'file':
            content = <Image source={icon} style={[updatedStyles.Image, styles]} resizeMode={resizeMode}/>
            break
        case 'link':
            content = <Image source={{ uri: icon }} style={[updatedStyles.Image, styles]} resizeMode={resizeMode}/>
            break
        default:
            content = <Icon name={icon} type={type}
                            size={size} color={color ? color : theme['--on-surface']}
                            containerStyle={{ padding:0, margin: 0, width: 16 }}/>
    }

    if(onPress){
        return (
            <Pressable onPress={onPress}>{content}</Pressable>
        )
    } else {
        return content
    }
}