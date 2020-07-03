import React, { useState } from 'react';

const Form = (props) => {
  const { handleChangeURL, handleLogin, error } = props;
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');

  const loginHandler = () => {
    if (!email.trim()) {
      setEmailError("Email can't be blank");
      return;
    } else {
      setEmailError('');
    }
    if (!pass.trim()) {
      setPassError("Password can't be blank");
      return;
    } else {
      setPassError('');
    }
    handleLogin({ email, pass });
  };

  return (
    <div className="login-box">
      <h3>{props.error}</h3>
      <input
        className="input-box"
        type="text"
        id="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <span style={{ color: 'red', alignSelf: 'flex-end' }}>{emailError}</span>
      <input
        className="input-box"
        type="password"
        id="Password"
        name="Password"
        placeholder="Password"
        value={pass}
        onChange={(event) => setPass(event.target.value)}
      />
      <span style={{ color: 'red', alignSelf: 'flex-end' }}>{passError}</span>

      <button className="btn login-btn" type="button" onClick={loginHandler}>
        {'Log in'}
      </button>
      <button
        className="btn login-btn"
        type="button"
        onClick={() => handleChangeURL('/signup')}
      >
        {'Sign up'}
      </button>
    </div>
  );
};

export default Form;
