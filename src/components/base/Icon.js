import { icons } from 'lucide-react-native';
import { useStyles } from 'react-native-unistyles'
import React from 'react'
export const Icon = React.forwardRef((props) => {
    const { name, color, size=20 } = props
    const { theme } = useStyles()
    const LucideIcon = icons[name] || icons['CircleHelp']
    return (
        <LucideIcon 
            color={color || theme.colors.base.text_100} 
            size={size} 
            style={props.style}
            />
    )
    
});

