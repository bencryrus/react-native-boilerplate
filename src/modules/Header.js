import React from 'react'
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import { View, Text, Button } from 'components'

export const Header = props => {
    const {
        label='Back',
        subtitle,
        onBack,
        trailing
    } = props;
    const theme = useSelector(state => state.db.theme)
    const navigation = useNavigation()
    const styles = StyleSheet.create({
        Container: {
            flexDirection: 'row',
            marginBottom: theme['--spacing'],
        },
        TextContainer: {
            flex: 1, 
            justifyContent: 'center', 
            marginLeft: theme['--spacing-small']
        }
    })

    return (
        <View styles={styles.Container}>
            <Button 
                onPress={() => navigation.goBack()} 
                icon='chevron-left'
                styles={{backgroundColor: theme['--surface']}}
                shadow={false}
                />
            
            <View 
                containerStyle={styles.TextContainer}
                onPress={() => navigation.goBack()}>
                <Text styles={{fontWeight: subtitle ? 'bold' : 'normal'}}>{label}</Text>
                {subtitle && <Text type='subtitle'>{subtitle}</Text>}
            </View>

            {trailing}
        </View>
    )
}