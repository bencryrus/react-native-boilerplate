import React from "react";
import { StyleSheet, TextInput, View } from 'react-native'
import { useSelector } from "react-redux";

export const CustomTextInput = props => {
    const {
        placeholder='Enter value...',
        defaultValue,
        multiline=false,
        onChange,
        isTitle=false
    } = props;
    const theme = useSelector(state => state.db.theme)
    const styles = StyleSheet.create({
        Container: {
            borderWidth: 0,
            borderColor: theme['--outline'],
            width: '100%',
            marginVertical: theme['--spacing-small'],
            ...props.styles
        },
        TextInput: {
            color: theme['--on-surface'],
            fontSize: theme['--body-medium-fontSize'],
            lineHeight: theme['--body-medium-lineHeight'],
            fontFamily: theme['--body-medium-font'],
            ...props.styles
        },
        TitleInput: {
            color: theme['--on-surface'],
            fontSize: theme['--title-large-fontSize'],
            lineHeight: theme['--title-large-lineHeight'],
            fontFamily: theme['--title-large-font'],
            fontWeight: 'bold',
            ...props.styles
        }
    })

    return (
        <View style={styles.Container}>
            <TextInput
                style={isTitle ? styles.TitleInput : styles.TextInput}
                placeholderTextColor={theme['--on-surface-variant']}
                placeholder={placeholder}
                defaultValue={defaultValue}
                multiline={multiline}
                onChangeText={onChange}
                onFocus={() => isActive.value = true}
                onBlur={() => isActive.value = false}
                />
        </View>
    )
}