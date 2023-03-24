import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import dbReducer from './reducers/db';
import contentReducer from 'store/reducers/content';

const rootReducer = combineReducers({
    db: dbReducer,
    content: contentReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store
