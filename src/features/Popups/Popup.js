import React from "react"
import { StyleSheet, Dimensions } from 'react-native'
import { useSelector } from "react-redux"

import Ripple from 'react-native-material-ripple';
import { View } from 'components'

import { hextoRGB } from 'utils'

const window = Dimensions.get('window')

const Popup = props => {
    const {
        element,
        onBackgroundPress,
        backgroundColor
    } = props;
    const theme = useSelector(state => state.db.theme)
    const styles = StyleSheet.create({
        Container: {    
            height: window['height'],
            width: window['width'],
            backgroundColor: hextoRGB(backgroundColor || theme['--bg-color'], 0.5),
        },
        Wrapper: {
            backgroundColor: theme['--bg-color-100'],
            padding: theme['--padding-large'],
            borderRadius: 5,
            minWidth: window['width']*0.60,
            maxWidth: window['width']*0.80,
            minHeight: window['height']*0.10,
            maxHeight: window['height']*0.80,
            borderWidth: 1,
            borderColor: hextoRGB(theme['--text-color'], 0.2),
            position: 'absolute'
        }
    })

    return (
        <View styles={[styles.Container, theme['colCenter']]}>
            <Ripple
                style={[styles.Container, theme['colCenter']]}
                onPress={onBackgroundPress}
                rippleColor={theme['--bg-color']}
                rippleCentered={true}
                rippleDuration={400}/>
            <View styles={styles.Wrapper}>{element}</View>
        </View>

    )
}

export default Popup