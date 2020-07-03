import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as action from '../container/Login/ActionTypes';

const Header = ({ user }) => {
  let history = useHistory();
  const dispatch = useDispatch();
  const logout = (e) => {
    e.preventDefault();
    dispatch({ type: action.CLEAR_USERDATA });
    history.push('/');
  };

  return (
    <header className="header">
      <div>
        <h3>{user.username}</h3>
      </div>

      {user.token && (
        <i
          className="fa fa-sign-out fa-2x"
          onClick={logout}
          style={{ cursor: 'pointer' }}
        ></i>
      )}
    </header>
  );
};

export default Header;
