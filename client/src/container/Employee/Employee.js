import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteEmployee } from './actions';
import { useHistory } from 'react-router-dom';

const Employee = ({ employee, handleEdit }) => {
  const { _id, email, name, age } = employee;
  const history = useHistory();

  const dispatch = useDispatch();
  const deleteHandler = () => {
    dispatch(deleteEmployee(_id));
  };

  const editHandler = () => {
    handleEdit(employee);
  };

  return (
    <div className="employee">
      <div>
        <h3 onClick={() => history.push(`/employees/${email}`)}>
          Name: {name}
        </h3>
        <p>Email: {email}</p>
      </div>
      <div>
        <h4>Age: {age}</h4>
      </div>

      <div className="edit">
        <i className="fa fa-trash" onClick={deleteHandler}></i>
        <i className="fa fa-edit" onClick={editHandler}></i>
      </div>
    </div>
  );
};

export default Employee;
