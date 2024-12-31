import React from 'react'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

import { Text, View, Pressable, Icon } from '../base';
import { Labels } from './Labels'
import { icons } from 'lucide-react-native';

export const ListTile = props => {
    const {
        title,
        leading,
        trailing,
        labels=[],
        onPress,
        onLongPress,
        modal,
        disabled
    } = props;
    const { styles, theme } = useStyles(stylesheet)

    return (
        <Pressable style={styles.Container} 
            onPress={onPress} onLongPress={onLongPress} modal={modal}
            disabled={disabled || !onPress && !onLongPress && !modal}
            >
            {icons[leading] ? <Icon name={leading} style={{marginLeft: theme.spacing.md}}/> : leading}
            <View style={{flex: 1}}>
                <Text>{title}</Text>
                {labels.length > 0 && <Labels values={labels}/>}
            </View>
            {icons[trailing] ? <Icon name={trailing}/> 
            : typeof trailing === 'string' ? <Text variant='code' color={theme.colors.base.text_300}>{trailing}</Text>
            : trailing}
        </Pressable>
    )
}

const stylesheet = createStyleSheet(theme => {
    return {
        Container: {
            borderWidth: 0,
            borderColor: 'red',
            paddingVertical: theme.spacing.md,
            gap: theme.spacing.md,
            flexDirection: 'row',
            alignItems: 'center'
        },
    }
});
