import React from 'react'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

import { Text, View } from 'components';
import { Button } from '../core'

import _ from 'lodash'

export const NumberSelector = props => {
    const {
        value=0,
        onSelect,
        onChange,
        increments=[-20,-10,10,20],
        disableIncrements=false,
        decimal=true
    } = props;
    const { styles, theme } = useStyles(stylesheet)

    const onPress = (i) => {
        // console.log(i)
        onSelect?.(
            i <= 9 ? i
            : i === 11 ? 0
            : i === 12 ? 'delete'
            : i === 10 ? 'dot'
            : null
        )
    }

    const onIncrement = (increment) => {
        const new_value = Number(value) + increment
        onChange?.(new_value < 0 ? 0 : new_value)
    }

    const renderIncrements = () => {
        let blocks = []
        if(disableIncrements) { return }
        increments.forEach(increment => {
            blocks.push(
                <Button
                    label={`${increment > 0 ? '+' : ''}${increment}`}
                    onPress={() => onIncrement(increment)}
                    backgroundColor='transparent'
                    label_props={{variant:'code', color: theme.colors.base.text_200}}
                    style={{borderRadius: theme.border_radius.md}}
                    />
            )
        })
        return <View style={styles.IncrementsContainer}>{blocks}</View>
    }

    const renderButtons = () => {
        const blocks = _.range(1,13).map(i => {
            const icon = i === 10 && decimal ? 'Dot'
                        : i === 12 ? 'Delete'
                        : null
            const label = i <= 9 ? i
                        : i === 11 ? 0
                        : null
            return (
                <Button
                    key={`${i}_NumberBlock`}
                    icon={icon}
                    label={label}
                    style={styles.NumberBlock}
                    type='outline'
                    onPress={() => onPress(i)}
                    disabled={i === 10 && !decimal}
                    disabled_background_color='transparent'
                    />
            )
        })

        return <View style={styles.Grid}>{blocks}</View>
    }

    const renderGrid = () => {
        let output = [
            <View style={[styles.VerticalGridLine, {left: `${100/3}%`}]}/>,
            <View style={[styles.VerticalGridLine, {left: `${2*100/3}%`}]}/>,
            <View style={[styles.HorizontalGridLine, {top: `${100/4}%`}]}/>,
            <View style={[styles.HorizontalGridLine, {top: `${2*100/4}%`}]}/>,
            <View style={[styles.HorizontalGridLine, {top: `${3*100/4}%`}]}/>
        ]
        return output
    }

    return (
        <View style={styles.Container}>
            <View>
                {renderButtons()}
                {renderGrid()}
            </View>
            {renderIncrements()}
        </View>
    )
}

const stylesheet = createStyleSheet(theme => {
    return {
        Container: {
            gap: theme.spacing.md,
            // padding: theme.spacing.md
        },
        IncrementsContainer: {
            backgroundColor: theme.colors.base.surface_300,
            borderRadius: 50,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '100%'
        },
        NumberBlock: {
            borderWidth: 0,
            borderColor: theme.colors.base.border_100,
            width: `${100/3}%`,
            padding: theme.spacing.md,
            borderRadius: 0,
        },
        Grid: {
            flexWrap: 'wrap',
            flexDirection: 'row',
            // gap: theme.spacing.md
        },
        VerticalGridLine: {
            position: 'absolute',
            height: '100%',
            borderWidth: 0.5,
            borderColor: theme.colors.base.border_100,
            // left: `${100/3}%`
        },
        HorizontalGridLine: {
            position: 'absolute',
            width: '100%',
            borderWidth: 0.5,
            borderColor: theme.colors.base.border_100,
        }
    }
});
