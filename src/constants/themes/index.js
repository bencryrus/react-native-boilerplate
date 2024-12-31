import { radix_dark, brand_dark } from './dark'
import { radix_light, brand_light } from './light'
import { spacing, border_radius, borders, shadow, scaling } from './dimensions'
import { layouts } from './layouts'
import { text } from './text'

const dark_theme = {
    spacing,
    border_radius,
    text,
    borders,
    scaling,
    shadow,
    layouts,
    colors: {
        ...radix_dark,
        gray: radix_dark.base,
        brand: brand_dark
    }
}

const light_theme = {
    spacing,
    border_radius,
    text,
    borders,
    scaling,
    shadow,
    layouts,
    colors: {
        ...radix_light,
        gray: radix_light.base,
        brand: brand_light
    }
}

export const themes = {
    light: light_theme,
    dark: dark_theme
}
