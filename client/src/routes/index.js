import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import authHOC from '../hoc/authHOC';
import Login from 'container/Login';

import Signup from 'container/Signup';
import Home from 'container/Home';
import EmployeeDetail from 'container/Employee/EmployeeDetail';
import PageNotFound from 'container/PageNotFound';

const routes = (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={authHOC(Home)} />
        <Route exact path="/signup" component={Signup} />
        <Route path="/employees/:email" exact component={EmployeeDetail} />

        <Route path="" component={PageNotFound} />
      </Switch>
    </Router>
  );
};

export default routes;
