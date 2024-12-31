import { ToastAndroid, Alert, Platform, Linking } from 'react-native';
import * as Notifications from 'expo-notifications';
import axios from 'axios'

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
});

export const requestNotiPermission = async() => {
    let token;
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    if(finalStatus !== 'granted') {
        console.log('Failed to get push token for push notification!');
        // [TODO] Redirect to device settings
        setToast({
            title: 'Permissions required', 
            subtitle: 'Please grant Boilerplate permissions to send you notifications', 
            buttons: [
                { text: 'Settings', onPress: () => Linking.openURL(`App-Prefs:NOTIFICATIONS_ID&path=${proces.env.BUNDLE_ID}`), isPreferred: true },
                { text: 'Cancel' }
            ]
        })
        return
    }
    const res = await Notifications.getExpoPushTokenAsync({applicationId: process.env.BUNDLE_ID, projectId: process.env.EXPO_PROJECT_ID})
    token = res?.data
    // console.log({token, status: finalStatus})
    return { token, status: finalStatus }
}

export const setPN = async({ title='Demo title', body='Demo body', delay=0 }) => {
    const { status } = await requestNotiPermission()

    if(status !== 'granted') { return }
    const cancel_res = await Notifications.cancelAllScheduledNotificationsAsync()
    Notifications.scheduleNotificationAsync({
        //set the content of the notification
        content: {
            title,
            body,
            sound: 'bell.wav',
            interruptionLevel: 'critical',
            vibrate: false,
        },
        trigger: delay > 0 && {
            type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
            seconds: delay,
        },
    })
    
}

export const cancelPNs = async() => {
    const res = await Notifications.cancelAllScheduledNotificationsAsync()
    return
}

export const setToast = ({ title='Something went wrong', options, buttons=[], subtitle, toast=true }) => {
    switch(Platform.OS) {
		case 'ios':
			Alert.alert(title, subtitle, buttons, options);
			break
		case 'android':
			if(toast) {
				ToastAndroid.show(title, ToastAndroid.SHORT);
			} else {
				Alert.alert(title, subtitle, buttons,options);
			}
			break
	}
}