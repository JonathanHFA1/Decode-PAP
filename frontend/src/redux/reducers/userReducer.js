import { USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_RESET, USER_SIGNIN_SUCCESS, USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_RESET, USER_SIGNUP_SUCCESS } from '../constants/userConstante';


//Sign Up/registar
export const userReducerSignUp = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNUP_REQUEST:
      return { loading: true };
    case USER_SIGNUP_SUCCESS:
      return {
        loading: false,
        usersSignUp: action.payload,
      };
    case USER_SIGNUP_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_SIGNUP_RESET:
      return {};

    default:
      return state;
  }
};
//sign In/entrar
export const userReducerSignIn = (state = {}, action) => {
    switch (action.type) {
      case USER_SIGNIN_REQUEST:
        return { loading: true };
      case  USER_SIGNIN_SUCCESS:
        return {
          loading: false,
          USER_SINGINsSignUp: action.payload,
        };
      case USER_SIGNIN_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case  USER_SIGNIN_RESET:
        return {};
  
      default:
        return state;
    }
  };
  