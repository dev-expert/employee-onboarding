import React from 'react';
import Header from 'components/Header';
import EmployeeListing from 'container/Employee';
import { useSelector } from 'react-redux';

const Home = () => {
  const user = useSelector((state) => state.login.userData);
  return (
    <div>
      {user.token && <Header user={user} />}
      <EmployeeListing />
    </div>
  );
};

export default Home;
