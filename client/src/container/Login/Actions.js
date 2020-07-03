import * as types from './ActionTypes';
import api from 'api';

const clearToken = () => {
  return (dispatch, getState) => {
    return dispatch({ type: types.CLEAR_USERDATA, payload: {} });
  };
};

const setUserData = (data) => {
  return (dispatch, getState) => {
    return dispatch({ type: types.SET_USERDATA, payload: data });
  };
};

export const resetState = () => {
  return (dispatch) => {
    dispatch({ type: 'RESET_STATE' });
  };
};

export const logout = () => {
  return (dispatch, getState) => {
    dispatch(clearToken());
  };
};

export const Login = (data) => {
  const { email, pass } = data;
  return async (dispatch, getState) => {
    dispatch(clearToken());
    const data = {
      email,
      password: pass,
    };
    const response = await api.post('/login', data);
    // console.log('res', response);
    if (response.status === 200) {
      console.log(response.data.data);
      dispatch(setUserData(response.data.data));
      dispatch({ type: 'SIGNIN_SUCCESS' });
    } else {
      dispatch({ type: 'SIGNIN_ERROR', payload: 'invalid email passwrod' });
    }
  };
};

export const resetSignup = () => {
  return (dispatch) => {
    dispatch({ type: 'RESET_SIGNUP' });
  };
};

export const SignUp = (data) => {
  const { name, email, pass } = data;
  return async (dispatch, getState) => {
    dispatch(clearToken());
    const data = {
      userName: name,
      password: pass,
      email,
    };
    const response = await api.post('/signup', data);
    console.log(response);
    if (response.status === 200) {
      dispatch({ type: 'SIGNUP_SUCCESS', error: '' });
    } else {
      dispatch({ type: 'SIGNUP_ERROR', error: 'User already exists' });
    }
  };
};
