import * as types from './ActionTypes';
import api from 'api';

export const fetchEmployees = () => {
  return async (dispatch) => {
    dispatch({ type: types.FETCH_EMPLOYEE, payload: {} });
    try {
      const response = await api.get('/employees');
      response.status === 200 &&
        dispatch({
          type: types.FETCH_EMPLOYEE_SUCCESS,
          payload: response.data,
        });
    } catch (e) {}
  };
};

export const fetchEmployee = (email) => {
  return async (dispatch) => {
    console.log(email);
    dispatch({ type: types.FETCH_EMPLOYEE_BY_ID, payload: {} });
    try {
      const response = await api.get(`/employees/${email}`);
      console.log(response);
      response.status === 200 &&
        dispatch({
          type: types.FETCH_EMPLOYEE_BY_ID_SUCCESS,
          payload: response.data,
        });
    } catch (e) {}
  };
};

export const createEmployee = (employee) => {
  return async (dispatch) => {
    dispatch({ type: types.CREATE_EMPLOYEE, payload: {} });
    try {
      const response = await api.post('/employees', employee);
      response.status === 201 &&
        dispatch({
          type: types.CREATE_EMPLOYEE_SUCCESS,
          payload: {},
        });

      dispatch(fetchEmployees());
    } catch (e) {}
  };
};

export const deleteEmployee = (id) => {
  return async (dispatch) => {
    dispatch({ type: types.DELETE_EMPLOYEE, payload: {} });

    try {
      const response = await api.delete('/employees', { data: { id } });
      response.status === 204 &&
        dispatch({
          type: types.DELETE_EMPLOYEE_SUCCESS,
          payload: {},
        });

      dispatch(fetchEmployees());
    } catch (e) {}
  };
};

export const updateEmployee = (employee) => {
  return async (dispatch) => {
    dispatch({ type: types.UPDATE_EMPLOYEE, payload: {} });
    try {
      const response = await api.put('/employees', employee);
      response.status === 204 &&
        dispatch({
          type: types.UPDATE_EMPLOYEE_SUCCESS,
          payload: {},
        });
      dispatch(fetchEmployees());
    } catch (e) {}
  };
};
