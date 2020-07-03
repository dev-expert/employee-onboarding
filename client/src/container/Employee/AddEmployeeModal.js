import React, { useState, useEffect } from 'react';

const Modal = ({
  visible,
  closeModal,
  addEmployee,
  mode,
  employee,
  updateEmployee,
}) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [age, setAge] = useState('');
  const [ageError, setAgeError] = useState('');
  const [about, setAbout] = useState('');
  const [aboutError, setAboutError] = useState('');

  useEffect(() => {
    if (mode === 'update') {
      setEmail(employee.email);
      setName(employee.name);
      setAge(employee.age);
      setAbout(employee.about);
    }
  }, [employee, mode]);

  const addEmployeeHandler = () => {
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

    if (!age) {
      setAgeError("age can't be blank");
      return;
    } else {
      setAgeError('');
    }

    if (!about.trim()) {
      setAboutError("about can't be blank");
      return;
    } else {
      setAboutError('');
    }

    if (mode === 'update') {
      updateEmployee({ email, name, _id: employee._id, age, about });
    } else {
      addEmployee({ email, name, age, about });
    }

    setName('');
    setEmail('');
    setAge('');
    setAbout('');
    closeModal();
  };

  const resetField = () => {
    setName('');
    setEmail('');
    setAge('');
    setAbout('');
  };

  return (
    <div className={`modal ${visible ? 'show-modal' : ''}`}>
      <div className="modal-body">
        <span className="modal-hide" onClick={closeModal}>
          &times;
        </span>
        <h3 className="modal-heading">
          {' '}
          {mode === 'update' ? 'Update Employee' : 'Add Employee'}{' '}
        </h3>

        <div className="form">
          <div className="input-row">
            <input
              className="input-box"
              type="text"
              value={name}
              placeholder="Employee Name"
              onChange={(e) => setName(e.target.value)}
            />
            <span style={{ color: 'red', alignSelf: 'flex-start' }}>
              {nameError}
            </span>
          </div>

          <div className="input-row">
            <input
              className="input-box"
              type="text"
              placeholder="Employee Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span style={{ color: 'red', alignSelf: 'flex-start' }}>
              {emailError}
            </span>
          </div>

          <div className="input-row">
            <input
              className="input-box"
              type="text"
              placeholder="Employee Age"
              value={age}
              onChange={(e) =>
                !isNaN(e.target.value) ? setAge(e.target.value) : setAge('')
              }
            />
            <span style={{ color: 'red', alignSelf: 'flex-start' }}>
              {ageError}
            </span>
          </div>

          <div className="input-row">
            <input
              className="input-box"
              type="text"
              placeholder="About Employee"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
            <span style={{ color: 'red', alignSelf: 'flex-start' }}>
              {aboutError}
            </span>
          </div>

          <div className="row buttons">
            {mode === 'update' ? (
              <button className="btn" onClick={addEmployeeHandler}>
                Update
              </button>
            ) : (
              <button className="btn" onClick={addEmployeeHandler}>
                Add
              </button>
            )}

            <button className="btn btn-cancel" onClick={resetField}>
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
