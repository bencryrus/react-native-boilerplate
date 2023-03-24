import * as React from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { useSelector } from 'react-redux' 
const Spinner = props => {
    const {
        color,
        size=20
    } = props
    const theme = useSelector(state => state.db.theme)
    return <ActivityIndicator animating={true} color={color || theme['--text-color']} size={size}/>
}

export default Spinner;