import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { userReducerProfile, userReducerSignIn, userReducerSignUp } from './reducers/userReducer';
// import { userReducerLogout, userReducerProfile, userReducerSignIn, userReducerSignUp } from './reducers/userReducer';

//combinar reducers
const reducer = combineReducers({
    signUp:userReducerSignUp,
    signIn:userReducerSignIn,
    userProfile:userReducerProfile
});

//state inicial
let initialState = {};

const midddleware = { thunk };

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...midddleware)));




export default store;