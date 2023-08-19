import React from 'react'
import { SafeAreaView, StyleSheet, Platform, BackHandler, ToastAndroid } from 'react-native'
import { useSelector } from 'react-redux'
import { useNavigation, useNavigationState, useFocusEffect } from '@react-navigation/native';

import { View, Text, Icon } from 'components' 
import Collapsible from 'react-native-collapsible';
import Animated, { useAnimatedStyle, useSharedValue, Easing, withTiming, withDelay } from 'react-native-reanimated';

const baseScreens = ['PlaygroundModule','TestModule']

const Option = props => {
    const {
        id,
        label='Tab',
        icon,
        isSelected,
        navigation,
        disabled
    } = props;
    const theme = useSelector(state => state.db.theme)
    const styles = StyleSheet.create({
        Container: {
            borderWidth: 0,
            borderColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            backgroundColor: theme['--surface']
        },
        Label: {
            textTransform: 'uppercase',
            color: isSelected ? theme['--on-surface'] : theme['--on-surface'],
            fontWeight: 'bold',
            fontSize: 12,
            marginBottom: 4
        }
    })

    return (
        <View 
            styles={styles.Container} 
            containerStyle={{flex: 1, height: '100%'}}
            onPress={() => {
                !disabled && navigation.navigate(id)
            }}
            >
            <View styles={{justifyContent: 'center', alignItems: 'center', flex: 0, }}>
                <Text styles={styles.Label} numberOfLines={1}>{label}</Text>
                <Collapsible collapsed={!isSelected}>
                    <Icon icon={icon}/>
                </Collapsible>
            </View>
            
        </View>
    )
} 

const options = {
    PlaygroundModule: { label: 'Playground', icon: 'dots-horizontal' },
    TestModule: { label: 'Test', icon: 'dots-horizontal' },
}

export const NavBar = (props) => {
    const theme = useSelector(state => state.db.theme)
    const show = useSharedValue(false)
    const navigation = useNavigation()
    const state = useNavigationState(state => state);
    const [tab, setTab] = React.useState(null)
    const [exitApp, setExitApp] = React.useState(0);

    React.useEffect(() => {
        const currentStack = state && state.routes[state['index']]['name']
        if(baseScreens.includes(currentStack)) {
            setTab(currentStack)
            show.value = true
        } else {
            show.value = false
        }
    }, [state])

    useFocusEffect(
        React.useCallback(() => {
            if(Platform.OS !== 'android') { return }
            const onBackHandler = BackHandler.addEventListener(
                'hardwareBackPress',
                onBack,
            );
            return () => onBackHandler.remove();
        }, [state, exitApp])
    );

    const onBack = () => {
        const newState = navigation.getState()
        const currentStack = newState &&  newState.routes[state['index']]['name']
        if(!baseScreens.includes(currentStack)) {
            navigation.goBack()
        } else if (baseScreens.includes(currentStack)) {
            setTimeout(() => {
                setExitApp(0);
            }, 2000); // 2 seconds to tap second-time
            if (exitApp === 0) {
                setExitApp(exitApp + 1);
                ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
            } else if (exitApp === 1) {
                BackHandler.exitApp();
            }
        }
        return true
    }


    return (
        <View styles={{marginTop: theme['--spacing']}}>
            <View styles={{flexDirection: 'row', height: 46}}>
                {Object.keys(options).map(option => {
                    return <Option
                            key={option}
                            id={option}
                            onPress={() => setTab(tab)}
                            {...options[option]}
                            navigation={navigation}
                            isSelected={option === tab}
                            />
                    })}
            </View>
            <SafeAreaView/>
        </View>
    )
}

export default NavBar