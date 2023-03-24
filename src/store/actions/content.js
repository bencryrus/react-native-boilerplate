import * as actionTypes from '../actions/actionTypes';

export const setModal = (modal, id) => {
    return {
        type: actionTypes.SET_MODAL,
        modal,
        id,
    }
}

export const setOverlay = (overlay, props) => {
    return {
        type: actionTypes.SET_OVERLAY,
        overlay,
        props,
    }
}

export const setModule = (module, props) => {
    return {
        type: actionTypes.SET_MODULE,
        module,
        props
    }
}