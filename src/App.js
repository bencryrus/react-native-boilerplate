import React from 'react'
import { LogBox, Appearance } from 'react-native';
LogBox.ignoreLogs(['Warning: ...','Please report: Excessive number of pending callbacks: 501']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
import { useSelector } from 'react-redux';

import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';

import { store } from './store'
import { LoadingScreen, MainScreen, OnboardingScreen } from './screens';
import { colorTheme } from './utils'

const Stack = createNativeStackNavigator();

const Nav = props => {
	const status = useSelector(state => state.db.status)
	const theme = useSelector(state => state.db.theme)
	const statusBarStyle = !status.includes('LOADED') ? 'light' : (colorTheme(theme['--bg-color']) === 'dark' ? 'light' : 'dark')
	// console.log({statusBarStyle	})
	
	return (
		<Stack.Navigator 
			initialRouteName='LoadingScreen' 
			screenOptions={{ 
				headerShown: false, 
				statusBarTranslucent: true, 
				statusBarColor: 'transparent', 
				statusBarStyle,
				statusBarAnimation: 'fade'
			}}
			>
			<Stack.Screen name="LoadingScreen" component={LoadingScreen} options={{animation: 'fade'}}/>
			<Stack.Screen name="MainScreen" component={MainScreen} options={{animation: 'fade'}}/>
			<Stack.Screen name="OnboardingScreen" component={OnboardingScreen} options={{animation: 'fade'}}/>
		</Stack.Navigator>
	)
}
const App = () => {
	const navigationRef = useNavigationContainerRef();

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Provider store={store}>
				<NavigationContainer ref={navigationRef}>
					<Nav/>
				</NavigationContainer>
			</Provider>
		</GestureHandlerRootView>
	)
}

export default App;