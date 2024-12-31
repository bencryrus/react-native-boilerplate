import { UnistylesRegistry } from 'react-native-unistyles'
import { themes } from './constants'

UnistylesRegistry
.addThemes(themes)
.addConfig({
    adaptiveThemes: true,
    initialTheme: 'dark'
})