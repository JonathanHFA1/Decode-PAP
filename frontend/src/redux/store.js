import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { userReducerLogout, userReducerProfile, userReducerSignIn, userReducerSignUp } from './reducers/userReducer';
// import { userReducerLogout, userReducerProfile, userReducerSignIn, userReducerSignUp } from './reducers/userReducer';

//combinar reducers
const reducer = combineReducers({
  signUp: userReducerSignUp,
  signIn: userReducerSignIn,
  userProfile: userReducerProfile,
  logOut: userReducerLogout,
});

//state inicial
let initialState = {
  signIn: {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
  },
};

const middleware = [thunk]; // Coloque o middleware dentro de um array

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)) // Espalhe os middleware usando o operador de propagação
);


export default store;
