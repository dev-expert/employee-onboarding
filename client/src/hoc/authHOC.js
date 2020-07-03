import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export default function (WrappedComponent) {
  class AuthWrapper extends React.Component {
    getComponent() {
      const { token } = this.props.loginState.userData;
      if (token) {
        return <WrappedComponent {...this.props} />;
      } else {
        this.props.history.push('/');
      }
    }
    render() {
      return <React.Fragment>{this.getComponent()}</React.Fragment>;
    }
  }

  function mapStateToProps(state, ownProps) {
    return {
      loginState: state.login,
    };
  }

  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators({}, dispatch),
    };
  }

  return connect(mapStateToProps, mapDispatchToProps)(AuthWrapper);
}
