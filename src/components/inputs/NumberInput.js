import React from 'react'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

import { View, NumberSelector } from 'components'
import { TextInput } from 'react-native';

export const NumberInput = props => {
    const {
        initial=0,
        decimal=true,
        onSelect
    } = props
    const { styles } = useStyles(stylesheet)
    const [value, setValue] = React.useState(initial)
    const [selection, setSelection] = React.useState({start: `${value}`.length, end: `${value}`.length})

    const onChange = new_value => {
        setValue(new_value)
        onSelect?.(new_value)
    }

    const onSelectHandler = (input) => {
        const { start, end } = selection
        const is_selected = start !== null && end !== null && start !== end
        let new_selection = {...selection}
        let new_value = `${value}`
        if(input <= 9) {
            new_value =  new_value.slice(0, start) + input + new_value.slice(end)
            new_selection = { start: start+1, end: start+1 }
        } else if (input === 'dot') {
            if(new_value.includes('.')) { return }
            new_value =  new_value.slice(0, start) + '.' + new_value.slice(end)
            new_selection = { start: start+1, end: start+1 }
        } else if (input === 'delete') {
            if(start === 0 && end === 0) { return }
            new_value =  is_selected ? new_value.slice(0, start) + new_value.slice(end) : new_value.slice(0, start-1) + '' + new_value.slice(end)
            const new_index = start-1 >= 0 ? start-1 : 0
            new_selection = is_selected ? { start, end: start } : { start: new_index, end: new_index }
        }
        setValue(new_value)
        setSelection(new_selection)
        onSelect?.(new_value)
    }

    const onSelectionChange = ({nativeEvent: {selection: {start, end} }}) => {
        setSelection({start, end})
    }

    return (
        <View style={styles.Container}>
            <TextInput
                autoFocus={true}
                showSoftInputOnFocus={false}
                contextMenuHidden={true}
                editable={true}
                defaultValue={`${value}`}
                selection={selection}
                style={styles.NumberInput}
                textAlign='center'
                onSelectionChange={onSelectionChange}
                />
            <NumberSelector 
                value={value}
                onSelect={onSelectHandler}
                onChange={onChange} // Need this because onSelectHandler will splice the new number in instead of replacing the entire selection
                decimal={decimal}
                />
        </View>
    )
}

const stylesheet = createStyleSheet(theme => {
    return {
        Container: {
            gap: theme.spacing.md
        },
        NumberInput: {
            color: theme.colors.base.text_100,
            fontWeight: 'bold',
            fontSize: 60,
            lineHeight: 70
        }
    }
});
