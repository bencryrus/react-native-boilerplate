import React from 'react';
import { LogBox } from 'react-native';
import './unistyles'
import { useStyles, UnistylesRuntime } from 'react-native-unistyles'

import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { store, persistor } from './store'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import * as screens from './screens'
LogBox.ignoreAllLogs();//Ignore all log notifications

const Stack = createNativeStackNavigator();
GoogleSignin.configure({});
const Navigation = props => {
    const { theme } = useStyles()
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='LoadingScreen'
                screenOptions={{
                    headerShown: false, 
                    statusBarStyle: UnistylesRuntime.themeName === 'dark' ? 'light' : 'dark',
                    statusBarAnimation: 'fade',
                    animation: 'slide_from_right',
                    gestureEnabled: true,
                    gestureDirection: 'horizontal',
                    contentStyle: { backgroundColor: theme.colors.gray.surface_100 }
                }}
                >
                {Object.keys(screens).map(key => {
                    let options
                    const screen = screens[key]
                    const controlled_screens = ['LoadingScreen','OnboardingScreen','AuthScreen','AppScreen','TestScreen','SettingsScreen']
                    if(controlled_screens.includes(key)) {
                        options = { gestureEnabled: false, animation: 'fade' }
                    }
                    return <Stack.Screen name={key} component={screen} options={options}/>
                })}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const Root = props => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <GestureHandlerRootView>
                    <SafeAreaProvider>
                        <BottomSheetModalProvider>
                            <Navigation/>
                        </BottomSheetModalProvider>
                    </SafeAreaProvider>
                </GestureHandlerRootView>
            </PersistGate>
        </Provider>
    )
}

export default Root