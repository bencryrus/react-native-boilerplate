
import { spacing, layouts, dark_theme, light_theme, default_colors, typography } from '../constants'

export const hextoRGB = (value, opacity=1, shade=1, tint=1) => {
    if(value.length != 7){
        // throw "Only six-digit hex colors are allowed.";
		return value
    }
	const hex = value.replace('#','')
    const aRgbHex = hex.match(/.{1,2}/g);

	let rgb = {
		r: parseInt(aRgbHex[0], 16),
		g: parseInt(aRgbHex[1], 16),
		b: parseInt(aRgbHex[2], 16)
	}
	// value === '#4361ee' && console.log('Before', rgb)
	Object.keys(rgb).forEach(key => {
		if(shade > 0 && shade !== 1) {
			rgb[key] = Math.round(rgb[key] + ((255 - rgb[key]) * shade))
		} else if (tint > 0 && tint !== 1) {
			rgb[key] = Math.round(rgb[key] * (1 - tint))
		}
	})
	// value === '#4361ee' && console.log('After', rgb)

    const aRgb = `rgba(${rgb['r']},${rgb['g']},${rgb['b']},${opacity || 1})`
    return aRgb;
}

const inputToRGB = (value) => {
	if(value.length != 7){
        // throw "Only six-digit hex colors are allowed.";
		return value
    }
	const hex = value.replace('#','')
    const aRgbHex = hex.match(/.{1,2}/g);

	let rgb = {
		r: parseInt(aRgbHex[0], 16),
		g: parseInt(aRgbHex[1], 16),
		b: parseInt(aRgbHex[2], 16)
	}

	return rgb
}

const getBrightness = (value) => {
	const rgb = inputToRGB(value)
	return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000
}

export const colorTheme = (value) => {
	const brightness = getBrightness(value)
	return brightness < 128 ? 'dark' : 'light'
}

export const createPalette = (colors) => {
	const debug = false
    const { bgColor, primaryColor, secondaryColor } = colors
	let output = {
		'--bg-color': bgColor,
		'--primary-color': primaryColor,
		'--secondary-color': secondaryColor
	}
	for (const [key, value] of Object.entries(output)) {
		if(value) {
			const theme = colorTheme(value)
			const percents = [...Array(9).keys()].map(x => ((x+1)*0.1).toFixed(1))

			// 1. Get the shades
			percents.forEach(percent => {
				output[`${key}-${percent*1000}`] = theme === 'dark' ? hextoRGB(value,1,percent,1) : hextoRGB(value,1,1,1-percent)
			})

			// 2. Get the text color
			const prefix = key.split('-')[2]
			const textKey = prefix === 'bg' ? '--text-color' : `--${prefix}-text-color`
			output[textKey] = theme === 'dark' ? '#F5F5F5' : '#1f1f29'

			// 3. Get the shades for the text color
			percents.forEach(percent => {
				output[`${textKey}-${percent*1000}`] = theme === 'dark' ? hextoRGB(output[textKey],1,1,percent) : hextoRGB(output[textKey],1,percent,1)
			})
			
		}
	}
	debug && console.log(JSON.stringify(output, undefined, 2))
	return output
}

export const getTextColor = (color, shade) => {
    const theme = colorTheme(color)
    const textColor = theme === 'dark' ? '#F5F5F5' : '#1f1f29'
    if(shade > 0) {
        return theme === 'dark' ? hextoRGB(textColor,1,1,shade) : hextoRGB(textColor,1,shade,1)
    } else {
        return textColor
    }
}

export const getShadeColor = (color, shade=1, opacity=1) => {
	const isHex = color.includes('#')
	if(isHex) {
		return hextoRGB(color,opacity,1,1)
	} else {
		return color.replace('1.0',opacity)
	}
	// const theme = colorTheme(color)
	// return theme === 'dark' ? hextoRGB(color,opacity,1,shade) : hextoRGB(color,opacity,shade,1)
}

export const createTheme = (theme='dark') => {
	const defaults = {
		...spacing,
		...layouts,
		...typography,
		...default_colors,
	}
	return theme === 'dark' ? {...defaults, ...dark_theme} : {...defaults, ...light_theme}
}