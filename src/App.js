import React from 'react'
import { LogBox, Appearance } from 'react-native';
LogBox.ignoreLogs(['Warning: ...','Please report: Excessive number of pending callbacks: 501']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'

import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';

import { store } from './store'
import { Modal } from './components'
import { LoadingModule, OnboardingModule, PlaygroundModule, TestModule } from './modules';
import { colorTheme } from './utils'
import * as actions from './store/actions'

const Stack = createNativeStackNavigator();

const Nav = props => {
	const status = useSelector(state => state.db.status)
	const theme = useSelector(state => state.db.theme)
	const dispatch = useDispatch()
	const statusBarStyle = !status.includes('LOADED') && theme ? 'light' : 'dark'
	const navigationRef = useNavigationContainerRef();
	const insets = useSafeAreaInsets()

	const modal = useSelector(state => state.content.modal)
    const modalProps = useSelector(state => state.content.modalProps)
    const secModal = useSelector(state => state.content.secModal)
    const secModalProps = useSelector(state => state.content.secModalProps)
    const [isModalActive, setModalActive] = React.useState(false)
    const [isSecModalActive, setSecModalActive] = React.useState(false)

	return (
		// Need theme for NavigationContainer, else will have white flickering when switching between screens
		<GestureHandlerRootView style={{ flex: 1, backgroundColor: 'transparent' }}>
			<NavigationContainer ref={navigationRef} theme={{colors: { background: theme['--surface'] }}}> 
				<Stack.Navigator 
					initialRouteName='LoadingModule' 
					screenOptions={{ 
						headerShown: false, 
						statusBarTranslucent: true, 
						statusBarColor: 'transparent', 
						statusBarStyle,
						statusBarAnimation: 'fade',
						contentStyle: { 
							backgroundColor: theme['--surface'], 
							paddingTop: insets.top, 
							// paddingBottom: insets.bottom
						},
						animation: 'none',
						gestureEnabled: true,
						gestureDirection: 'horizontal'
					}}
					>
					<Stack.Screen name="LoadingModule" component={LoadingModule} options={{gestureEnabled: false, animation: 'fade', contentStyle: {paddingBottom: 0}}}/>
					<Stack.Screen name="OnboardingModule" component={OnboardingModule} options={{gestureEnabled: false, animation: 'fade', contentStyle: {paddingBottom: 0}}}/>
					<Stack.Screen name="PlaygroundModule" component={PlaygroundModule} options={{gestureEnabled: false}}/>
					<Stack.Screen name="TestModule" component={TestModule}/>

				</Stack.Navigator>

				<Modal 
					key={`modalID`}
					modalElement={modal} 
					visible={!secModal && !isSecModalActive && !!modal} 
					onClosed={() => dispatch(actions.setModal())}
					onModalHide={() => { setModalActive(false) }}
					onModalShow={() => { setModalActive(true) }}
					modalProps={modalProps}
					/>
				{<Modal 
					key={`secModalID`}
					modalElement={secModal} 
					visible={!isModalActive && !!secModal} 
					onClosed={() => dispatch(actions.setSecModal())}
					animationInTiming={100}
					animationOutTiming={100}
					onModalHide={() => { setSecModalActive(false) }}
					onModalShow={() => { setSecModalActive(true) }}
					{...secModalProps}
					/>}

			</NavigationContainer>
		</GestureHandlerRootView>
		
	)
}

const App = () => {

	return (
		<Provider store={store}>
			<SafeAreaProvider>
				<Nav/>
			</SafeAreaProvider>
		</Provider>
	)
}

export default App;