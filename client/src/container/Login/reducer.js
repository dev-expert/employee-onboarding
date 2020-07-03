import * as types from './ActionTypes';

const initialState = {
  userData: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USERDATA:
      console.log(action.payload);
      return {
        ...state,
        userData: action.payload,
      };
    case types.CLEAR_USERDATA:
      return {
        ...state,
        userData: initialState.userData,
      };
    case 'RESET_SIGNUP':
      return {
        ...state,
        signup: false,
        message: '',
      };

    case 'SIGNIN_ERROR':
      return {
        ...state,
        error: action.payload,
      };

    case 'SIGNIN_SUCCESS':
      return {
        ...state,
        error: '',
      };

    case 'RESET_STATE':
      return initialState;

    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        signup: 'Registration Successfull',
      };
    case 'SIGNUP_ERROR':
      return {
        ...state,
        signup: 'user already exist',
      };

    default:
      return state;
  }
};
