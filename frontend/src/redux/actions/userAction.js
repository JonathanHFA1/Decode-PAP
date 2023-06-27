import { USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS } from '../constants/userConstante';
import axios from 'axios';
import toast from 'react-toastify';

export const usersSignUpAction = (user) => async (dispatch) => {
  dispatch({ type: USER_SIGNUP_REQUEST });
  const { data } = await axios.post('/api/signup', user);

  try {
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
