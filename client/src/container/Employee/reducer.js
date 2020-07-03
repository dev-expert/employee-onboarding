import * as types from './ActionTypes';

const initState = {
  employees: [],
  loading: false,
  signup: false,
};
const reducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.FETCH_EMPLOYEE:
      return {
        ...state,
        employees: initState.employees,
        loading: true,
      };

    case types.FETCH_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employees: [...payload.employees],
      };

    case types.FETCH_EMPLOYEE_BY_ID_SUCCESS:
      return {
        ...state,
        searchedEmployee: payload.length > 0 && payload[0],
      };

    case types.DELETE_EMPLOYEE:
      return {
        ...state,
      };

    case types.DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
      };

    case 'UPDATE_EMPLOYEE':
      break;

    default:
      return state;
  }
};

export default reducer;
