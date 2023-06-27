import { USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS } from '../constants/userConstante';
import axios from 'axios';
import toast from 'react-toastify';

//sign up action
export const usersSignUpAction = (user) => async (dispatch) => {
  dispatch({ type: USER_SIGNUP_REQUEST });

  try {
    const { data } = await axios.post('/api/signup', user);
    dispatch({
      type: USER_SIGNUP_SUCCESS,
      payload: data,
    });
    toast.success('Registro feito com sucesso');
  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload: error.response.data.error,
    });

    toast.error(error.response.data.error);
  }
};

//sign in action
export const usersSignInAction = (user) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST });
  try {
    const { data } = await axios.post('/api/signin', user);
    localStorage.setItem('userInfo', JSON.stringify(data));
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data,
    });
    toast.success('Login realizado com sucesso');
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload: error.response.data.error,
    });

    toast.error(error.response.data.error);
  }
};
