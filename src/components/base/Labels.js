import React from 'react'
import { StyleSheet } from 'react-native'
import uuid from 'react-native-uuid';

import { Text, View, Icon } from 'components'
import { useSelector } from 'react-redux';


export const Labels = props => {
    const {
        labels=[],
    } = props;
    const theme = useSelector(state => state.db.theme)
    const styles = StyleSheet.create({
        Container: {
            ...theme['rowHCenter'],
            flexWrap: 'wrap', 
            borderWidth: 0,
            borderColor: 'red',
            ...props.styles
        },
        Label: {
            color: theme['--text-color-300'],
            fontSize: theme['--subtitle-size']
        }
    })

    const getBlocks = () => {
        const values = labels.filter(x => x && x['value'])
        return values.map(({value, icon, color=theme['--text-color-300']}, index) => {
            if(value){
                return (
                    <View key={`${value}_${index}`} styles={[theme['rowHCenter']]}>
                        {icon && <Icon icon={icon} color={color || theme['--text-color-300']} styles={{marginRight: theme['--padding']/4}}/>}
                        <Text styles={{...styles.Label, color}}>{`${value}`}</Text>
                        {index !== values.length - 1 && <Icon icon='circle-small' color={theme['--text-color-300']} styles={{marginHorizontal: theme['--padding']/8}}/>}
                    </View>
                )
            }
        })
    }

    const blocks = getBlocks()

    return (
        <View styles={styles.Container}>
            {blocks}
        </View>
    )
}