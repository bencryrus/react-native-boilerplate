import { ToastAndroid, Alert, Platform } from 'react-native';
import _ from 'lodash'

export const setAlert = ({ title='Something went wrong', options, subtitle, toast=true }) => {
	switch(Platform.OS) {
		case 'ios':
			Alert.alert(title, subtitle, options);
			break
		case 'android':
			if(toast) {
				ToastAndroid.show(title, ToastAndroid.SHORT);
			} else {
				Alert.alert(title, subtitle, options);
			}
			break
	}
}