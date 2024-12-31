import { Text as NativeText } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

// body, bold, label, title, subtitle, header, subheader, code
export const Text = props => {
    const {
        variant='body',
        size='md',
        color,
        align='left',
        wrap=true,
        strikethrough=false
    } = props;
    const { styles } = useStyles(stylesheet)
    const defaults = styles[`${variant}_${size}`] || styles.default
    const text_styles = {
        ...defaults, 
        color: color || defaults?.color, 
        textAlign: align,
        textDecorationLine: strikethrough && 'line-through', 
        textDecorationStyle: strikethrough && 'solid'
    }
    return (
        <NativeText 
            style={[text_styles, props.style]} 
            numberOfLines={!wrap && 1}
            >
            {props.children}
        </NativeText>
    )
}

const stylesheet = createStyleSheet(theme => {
    let options = {}
    for (const [variant, values] of Object.entries(theme.text)) {
        for (const [size, props] of Object.entries(values)) {
            options[`${variant}_${size}`] = {
                ...props, 
                color: theme.colors.base[props.color || 'text_100'],
                // color: theme.colors.gray[`text_${variant === 'label' ? 200 : 100}`]
            }
        }
    }
    return options
});
