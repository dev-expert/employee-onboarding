import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as action from './Actions';

import { withRouter } from 'react-router';

import LoginForm from './Form';

export class Login extends Component {
  handleChangeURL = (url) => {
    if (url) {
      this.props.history.push(url);
    }
  };

  handleCheckOutAuthUser = () => {
    const { token } = this.props.loginState.userData;
    const { handleChangeURL } = this;
    if (token) {
      handleChangeURL('/home');
    }
  };
  componentDidMount() {
    this.handleCheckOutAuthUser();
    const f_beforeunload = (e) => {
      // I'm about t
      this.props.resetState();
    };
    window.onbeforeunload = window.removeEventListener(
      'beforeunload',
      f_beforeunload
    );
  }

  componentDidUpdate = () => {
    this.handleCheckOutAuthUser();
  };

  render() {
    const { handleChangeURL } = this;
    const { Login } = this.props;

    return (
      <div className="login">
        <div className="header">
          <h3>Login</h3>
          <h4 style={{ color: 'red' }}> {this.props.loginState.error}</h4>
        </div>

        <div className="login-box">
          <LoginForm handleChangeURL={handleChangeURL} handleLogin={Login} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loginState: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      ...action,
    },
    dispatch
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
