import React, { Component } from 'react';

import { connect } from 'react-redux';

import { withRouter } from 'react-router';
import SignUpForm from './Form';
import { bindActionCreators } from 'redux';
import * as action from '../Login/Actions';

export class Signup extends Component {
  handleChangeURL = (url) => {
    if (url) {
      this.props.history.push(url);
    }
  };

  handleCheckOutAuthUser = () => {
    const token = localStorage.getItem('token');
    const { handleChangeURL } = this;
    if (token) {
      handleChangeURL('/home');
    }
  };
  componentDidMount() {
    this.props.resetState();

    window.onbeforeunload = (e) => {
      // I'm about to refresh! do something...
      this.props.resetState();
    };
    this.handleCheckOutAuthUser();
  }

  componentDidUpdate = () => {
    this.handleCheckOutAuthUser();
  };

  render() {
    const { handleChangeURL } = this;
    const { SignUp } = this.props;

    return (
      <div className="login">
        <div className="header">
          <h3>Register</h3>
          <h4 style={{ color: 'red' }}> {this.props.loginState.signup}</h4>
        </div>
        <div className="login-box">
          <SignUpForm handleChangeURL={handleChangeURL} handleSignup={SignUp} />
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

// const mapDispatchToProps = (dispatch) => {
//   return {
//     loginUser: (user) => dispatch({ type: 'login', payload: user }),
//   };
// };
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));
