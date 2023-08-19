import _ from 'lodash'
import * as actionTypes from '../actions/actionTypes';
import { createTheme } from 'utils'
import { themes } from 'constants'

export const loadData = ({id, userid, token, callback, onLoad}) => {
    return dispatch => {
        dispatch({ type: actionTypes.LOAD_DATA })
        callback(true)
    }   
}

export const setPreferences = (preferences) => { 
    return dispatch => {
        // 1. Update preferences
        dispatch({type: actionTypes.SET_PREFERENCES, preferences})
        // [TODO] Commit preferences data (mmkv or online)

        // 2. Update theme
        const theme = createTheme(preferences['theme'])
        dispatch({ type: actionTypes.SET_THEME, theme })
    }
}
