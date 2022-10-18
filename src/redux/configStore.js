import { combineReducers, createStore } from 'redux';
import { formReducer } from './reducer/formReducer'
const rootReducer = combineReducers({
    formReducer
})
export const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
