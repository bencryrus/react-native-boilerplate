import * as actionTypes from './actionTypes'
import _ from 'lodash'
import { persistor } from './store'

import { firebase } from '@react-native-firebase/auth';
const auth = firebase.auth()

export const loadData = (user, callback) => {
    return dispatch => {
        callback?.(true)
        dispatch({ type: actionTypes.UPDATE_USER, user })
    }
}

export const signOut = (callback) => {
    return (dispatch, getState) => {
        console.log('sign out')
        // const socket = getState().socket
        return new Promise.all([
            persistor.purge(),
            auth.signOut(),
            // socket?.disconnect()
        ]).then(res => {
            dispatch({ type: actionTypes.UPDATE_DATA, data: null})  
            dispatch({ type: actionTypes.UPDATE_USER, user: null })
            callback?.(true)
        })
        .catch(err => {

        })
    }
}

export const updateUser = (values, callback) => {
    return (dispatch, getState) => {
        const user = getState().user
        callback?.(true)
        dispatch({ type: actionTypes.UPDATE_USER, user: {...user, ...values} })
    }
}