import React from "react"
import { StyleSheet, Linking } from 'react-native'
import { useSelector } from "react-redux"

import { View, Text, Button } from 'components'

const RatePopup = props => {
    const theme = useSelector(state => state.db.theme)
    const styles = StyleSheet.create({
        Container: {

        },
        Button: {
            backgroundColor: theme['--primary-color'],
            marginTop: 16,
        },
        Title: {
            fontWeight: 'bold',
            fontSize: theme['--title-size'],
            color: theme['--text-color']
        }
    })

    return (
        <View styles={styles.Container}>
            <Text styles={styles.Title}>Enjoy using the app?</Text>
            <Text>Drop us a review on the app store. It will help others to discover the app as well.</Text>
            <Button label='Review' styles={styles.Button} onPress={() => {
                Linking.openURL(Platform.OS === 'android' ? 'https://play.google.com/store/' : 'https://apps.apple.com/sg/app/buschecksgbusarrivals/id6446060237')
            }}/>
        </View>
    )
}

export default RatePopup