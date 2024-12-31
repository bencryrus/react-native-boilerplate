import React from 'react'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

import { View, Text, Icon, Pressable, Spinner } from '../base'

export const Button = props => {
    const {
        type='filled', // filled, outline, text
        label,
        icon, // { size, name }
        onPress,
        modal,
        modal_type,

        label_props,
        icon_props,
        spinner_props,
        pressable_props,
        disabled=false,
        loading=false,
        backgroundColor,
        disabled_background_color='#000'
    } = props;
    const icon_only = !label && icon
    const [width, setWidth] = React.useState(null)
    const stylesheet = createStyleSheet(theme => {
        return {
            Container: {
                backgroundColor: type !== 'filled' ? 'transparent' : backgroundColor || theme.colors.gray.surface_200,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: type === 'outline' ? 1 : 0,
                borderColor: theme.colors.gray.border_100,
                borderRadius: 50,
                height: 50,
                aspectRatio: icon_only && !props.style?.width ? 1 : 'auto',
                flexDirection: 'row',
                gap: icon_only ? 0 : theme.spacing.sm,
                paddingHorizontal: theme.spacing.xl,
                ...props.style
            },
            DisabledContainer: {
                position: 'absolute',
                width: width || '100%',
                height: '100%',
                // paddingHorizontal: theme.spacing.xl,
                backgroundColor: loading ? 'transparent' : disabled_background_color,
                opacity: 0.50,
                zIndex: 2,
                borderRadius: 50,
            }
        }
    });
    const { styles } = useStyles(stylesheet)

    const onLayout = (event) => {
        const { width } = event.nativeEvent.layout;
        setWidth(width)
    }

    return (
        <Pressable 
            style={styles.Container}
            onPress={onPress}
            modal={modal}
            modal_type={modal_type}
            disabled={disabled}
            onLayout={onLayout}
            {...pressable_props}
            >
            {disabled && <View style={styles.DisabledContainer}/>}
            {loading ? <Spinner {...spinner_props}/> 
            : icon ? <Icon name={icon} {...icon_props}/>
            : null}
            <Text {...label_props}>{label}</Text>
        </Pressable>
    )
}