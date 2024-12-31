import React from 'react'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

import { Text, View } from '../base';
import { Button } from '../core';

export const ConfirmSelector = props => {
    const {
        title='Confirm action',
        subtitle='Please note that this action cannot be undone',
        content,
        onConfirm,
        onCancel,
        confirm_label='Confirm',
        cancel_label='Cancel'
    } = props;
    const { styles, theme } = useStyles(stylesheet)
    const [loading, setLoading] = React.useState(false)

    const onCancelHandler = () => {
        onCancel?.()
        props.close?.()
    }

    const onConfirmHandler = () => {
        setLoading(true)
        onConfirm?.(success => {
            setLoading(false)
            props.close?.()
        })
    }

    return (
        <View style={styles.Container}>
            {content ||
            <View style={styles.Header}>
                {title && <Text variant='header'>{title}</Text>}
                {subtitle && <Text variant='subheader'>{subtitle}</Text>}
            </View>}
            <View style={styles.Row}>
                <Button
                    label={cancel_label}
                    style={styles.CancelButton}
                    onPress={onCancelHandler}
                    disabled={loading}
                    disabled_background_color='transparent'
                    />
                <Button
                    label={confirm_label}
                    style={styles.ConfirmButton}
                    loading={loading}
                    disabled={loading}
                    spinner_props={{color: theme.colors.tomato.text_100}}
                    onPress={onConfirmHandler}
                    />
            </View>
        </View>
    )
}

const stylesheet = createStyleSheet(theme => {
    return {
        Container: {
            padding: theme.spacing.md,
            paddingTop: theme.spacing.sm
        },
        Header: {
            marginLeft: theme.spacing.sm
        },
        Row: {
            flexDirection: 'row',
            gap: theme.spacing.md,
            width: '100%',
            justifyContent: 'space-between',
            marginTop: theme.spacing.md
        },
        ConfirmButton: {
            backgroundColor: theme.colors.tomato.solid_100,
            color: theme.colors.tomato.text_100,
            flex: 1
        },
        CancelButton: {
            backgroundColor: theme.colors.base.surface_200,
            flex: 1
        }
    }
});
