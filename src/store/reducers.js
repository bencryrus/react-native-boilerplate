import * as actionTypes from './actionTypes';
import _ from 'lodash'

const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

const initialState = {
    user: null,
    data: null,
};

export const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.UPDATE_DATA:
            return updateObject(state, { data: !action.data ? null : {...state.data, ...action.data} })
        case actionTypes.UPDATE_USER:
            return updateObject(state, { user: action.user })
        default:
            return updateObject(state)
    }
};