import * as actionTypes from '../actions/actionTypes';
import _ from 'lodash'
import { MMKV } from 'react-native-mmkv'
import { themes } from 'themes'
import { createTheme } from 'utils';

const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

const defaults = {
    '--error-color': '#ff0033',
    '--success-color': '#00E676',
    '--app-color': '#4361ee',
    '--app-text-color': '#f9f4f4'
}

const initialState = {
    status: [],
    theme: createTheme({...defaults, ...themes['dark']}),
    preferences: {
        theme: 'dark',
        font: 'Space Grotesk'
    }
};

const reducer = ( state = initialState, action ) => {
    let updatedState = {...state}

    switch ( action.type ) {
        case actionTypes.LOAD_DATA:
            return updateObject( state, { status: !state.status.includes('LOADED') ? [...state.status, 'LOADED'] : state.status })
        case actionTypes.SET_THEME:
            return updateObject(state, {theme: action.theme}) 
        case actionTypes.SET_PREFERENCES:
            return updateObject(state, {preferences: {...state.preferences, ...action.preferences}}) 
        default:
            return updateObject(state)
    }
};

export default reducer;

const storage = new MMKV();
export const reduxStorage = {
    setItem: (key, value) => {
        const jsonValue = JSON.stringify(value)
        storage.set(key, jsonValue);
        return Promise.resolve(true);
    },
    getItem: async key => {
        const value = storage.getString(key);
        return Promise.resolve(value)
        .then(jsonValue => {
            let output
            try {
                output = jsonValue != null ? JSON.parse(jsonValue) : null;
                return output
            } catch {
                return output
            }
        })
        .catch(err => {
            console.log('[getData] Failed', err)
            return {}
        })
    },
    removeItem: key => {
        storage.delete(key);
        return Promise.resolve();
    },
};
