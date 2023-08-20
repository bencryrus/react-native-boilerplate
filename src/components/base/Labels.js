import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Icon } from "@rneui/themed";

import { useSelector } from 'react-redux';

export const Labels = props => {
    const {
        labels=[],
    } = props;
    const theme = useSelector(state => state.db.theme)
    const styles = StyleSheet.create({
        Container: {
            flexDirection: 'row',
            flexWrap: 'wrap', 
            ...props.styles
        },
        Label: {
            color: theme['--on-surface-variant'],
            color: theme['--on-surface-variant'],
            fontSize: theme['--body-small-fontSize'],
            lineHeight: theme['--body-small-lineHeight'],
            fontFamily: theme['--body-small-font'],
        }
    })

    return (
        <View style={styles.Container}>
            {labels.map((value,index) => {
                const { label, icon, color } = value
                return (
                    <View key={`Label_${label}_${icon}_${index}`} style={{flexDirection: 'row', alignItems: 'center'}}>
                        {icon && 
                        <Icon name={icon} 
                            type={'material-community'}
                            size={theme['--body-small-lineHeight']} 
                            color={color || theme['--on-surface-variant']}
                            containerStyle={{ marginRight: theme['--spacing-smallest'] }}
                            />}
                            
                        <Text style={{...styles.Label, color: color || theme['--on-surface-variant']}}>{label}</Text>

                        {labels.length > 1 && index !== labels.length - 1 && 
                        <Icon name={'circle-small'} 
                            type={'material-community'}
                            size={theme['--body-small-lineHeight']} 
                            color={theme['--on-surface-variant']}
                            />}
                    </View>
                )
            })}
        </View>
    )
}