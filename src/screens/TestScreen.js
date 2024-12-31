import React from 'react'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

import { Text, Button, ConfirmSelector, NumberInput, WheelSelector } from 'components'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export const TestScreen = props => {
    const {

    } = props;
    const { styles } = useStyles(stylesheet)
    const [value, setValue] = React.useState(60.5)
    const navigation = useNavigation()

    return (
        <SafeAreaView style={styles.Container} >
            <Text variant='header' size='md'>TestScreen</Text>
            <Text>{value}</Text>
            <Button
                label='LoadingScreen'
                onPress={() => navigation.push('LoadingScreen')}
                />
            <Button
                label='NumberInput'
                modal={<NumberInput onSelect={setValue} initial={value} decimal={true}/>}
                />
            <Button
                label='WheelSelector'
                modal={<WheelSelector onSelect={setValue} initial={value} decimal={true}/>}
                />
            <Button
                label='Delete'
                modal={<ConfirmSelector onConfirm={callback => setTimeout(() => callback?.(), 1000)}/>}
                />
        </SafeAreaView>
    )
}

const stylesheet = createStyleSheet(theme => {
    return {
        Container: {
            // flex: 1,
            backgroundColor: theme.colors.gray.surface_100,
            padding: theme.spacing.md,
            gap: theme.spacing.md
        },
        Button: {
            backgroundColor: theme.colors.brand.solid_100,
            ...theme.borders.md,
            borderColor: theme.colors.brand.border_100,
            padding: theme.spacing.md,
        },
        NumberInput: {
            color: theme.colors.base.text_100,
            fontWeight: 'bold',
            fontSize: 60,
            lineHeight: 70
        }
    }
});
