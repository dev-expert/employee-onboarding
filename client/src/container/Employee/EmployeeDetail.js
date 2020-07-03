import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEmployee } from './actions';

const EmployeeDetail = (props) => {
  const email = props.match.params.email;
  const dispatch = useDispatch();
  const employee = useSelector((state) => state.employee.searchedEmployee);
  // const employee = employees.find((emp) => emp.email === id);
  useEffect(() => {
    dispatch(fetchEmployee(email));
  }, [email, dispatch]);
  return (
    <div className="employee-detail">
      {!employee ? (
        <h3>Employee Does not exist : {email}</h3>
      ) : (
        <React.Fragment>
          {employee && (
            <img
              src="https://i.pravatar.cc/100"
              alt=""
              style={{ marginBottom: '30px' }}
            />
          )}
          <div className="info">
            <p>Name: {employee?.name}</p>
            <p>Email: {employee?.email}</p>
            <p>Age: {employee?.age}</p>
            <p>
              About: <br /> {employee?.about}
            </p>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default withRouter(EmployeeDetail);
