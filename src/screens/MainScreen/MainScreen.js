import React from 'react'
import { StyleSheet, BackHandler, Platform, Dimensions, SafeAreaView, ToastAndroid } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { View, Text, Button, Modal } from 'components'
import { NavBar, TestModal, Popup } from 'features'
import { AboutModule, PlaygroundModule, SettingsModule } from 'modules'
import Animated, { FadeIn, FadeOut, SlideInUp, SlideOutUp } from 'react-native-reanimated'

import * as actions from 'store/actions'

const Tab = createBottomTabNavigator();

const MainScreen = props => {
    const theme = useSelector(state => state.db.theme)
    const dispatch = useDispatch()
    const modal = useSelector(state => state.content.modal)
    const module = useSelector(state => state.content.module)
    const overlay = useSelector(state => state.content.overlay)
    const overlayProps = useSelector(state => state.content.overlayProps)
    const [exitApp, setExitApp] = React.useState(0);

    const styles = StyleSheet.create({
        Container: {
            backgroundColor: theme['--bg-color'],
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        },
    })

    React.useEffect(
        () =>
        props.navigation.addListener('beforeRemove', (e) => {
            const action = e.data.action;    
            e.preventDefault();
        }),
        [props.navigation]
    );

	React.useEffect(() => {
        if(Platform.OS !== 'android') { return }
        const onBackHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            onBack,
        );
        return () => onBackHandler.remove();
	}, [exitApp, !!overlay])

    const onBack = () => {
        const isModalActive = !!modal
        const isOverlayActive = !!overlay
        if(!isModalActive && !isOverlayActive) {
            setTimeout(() => {
                setExitApp(0);
            }, 2000); // 2 seconds to tap second-time
            if (exitApp === 0) {
                setExitApp(exitApp + 1);
                ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
            } else if (exitApp === 1) {
                BackHandler.exitApp();
            }
        }  else if (isOverlayActive) {
            dispatch(actions.setOverlay())
        } else if (isModalActive) {
            dispatch(actions.setModal())
        }
        
        return true
    }

    const getOverlay = () => {
        switch(overlay) {
            case 'ABOUT':
                return <AboutModule/>
            case 'POPUP':
                return <Popup {...overlayProps} onBackgroundPress={() => dispatch(actions.setOverlay())}/>
        }
    }

    return (
        <View styles={styles.Container}>
            <Tab.Navigator
                initialRouteName='PLAYGROUND'
                tabBar={x => <NavBar {...x}/>}
                screenOptions={{ 
                    headerShown: false, 
                    statusBarTranslucent: true, 
                    statusBarColor: 'transparent', 
                    statusBarAnimation: 'fade'
                }}>
                <Tab.Screen name='PLAYGROUND' component={PlaygroundModule}/>
                <Tab.Screen name='SETTINGS' component={SettingsModule}/>
            </Tab.Navigator>

            {overlay && 
            <Animated.View 
                style={[{flex: 1, position: 'absolute', width: '100%', height: '100%'}]}
                entering={FadeIn} exiting={FadeOut}
                >
                {getOverlay()}
            </Animated.View>}

            <Modal 
                modalElement={modal} 
                visible={!!modal} 
                onClosed={() => dispatch(actions.setModal())}/>
        </View>
    )
}

export default MainScreen