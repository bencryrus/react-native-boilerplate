import * as actionTypes from '../actions/actionTypes';
import _ from 'lodash'

const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

const initialState = {
    modalID: null,
    modal: null,
    overlayID: null,
    overlayProps: null,
    module: 'PLAYGROUND',
    moduleProps: null
};


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SET_MODAL:
            return updateObject(state, {modal: action.modal, modalID: action.id}) 
        case actionTypes.SET_OVERLAY:
            return updateObject(state, {overlay: action.overlay, overlayProps: action.props}) 
        case actionTypes.SET_MODULE:
            return updateObject(state, {module: action.module, moduleProps: action.props}) 
        default:
            return updateObject(state)
    }
};

export default reducer;
