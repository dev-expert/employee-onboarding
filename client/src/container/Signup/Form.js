import React, { useState } from 'react';

const Form = (props) => {
  const { handleChangeURL, handleSignup } = props;
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');
  const [nameError, setNameError] = useState('');

  const signupHandler = () => {
    if (!name.trim()) {
      setNameError("Name can't be blank");
      return;
    } else {
      setNameError('');
    }

    if (!email.trim()) {
      setEmailError("Email can't be blank");
      return;
    } else if (!email.includes('@')) {
      setEmailError('Email is invalid');
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

    setEmailError('');
    setNameError('');
    setPassError('');

    handleSignup({ name, pass, email });
  };

  return (
    <div className="login-box">
      <input
        className="input-box"
        type="text"
        id="UserName"
        name="UserName"
        placeholder="Username"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <span style={{ color: 'red', alignSelf: 'flex-end' }}>{nameError}</span>

      <input
        className="input-box"
        type="text"
        id="Email"
        name="Email"
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

      <button
        className="btn btn--white login-btn"
        type="button"
        onClick={signupHandler}
      >
        {'Sign up'}
      </button>
      <button
        className="btn btn--white login-btn"
        type="button"
        onClick={() => handleChangeURL('/')}
      >
        {'Log in'}
      </button>
    </div>
  );
};

export default Form;
