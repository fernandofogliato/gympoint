import React from 'react';

import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import Dashboard from '~/pages/Dashboard';
import StudentList from '~/pages/Student/list';
import StudentForm from '~/pages/Student/form';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/students/:id" component={StudentForm} isPrivate />
      <Route path="/students" component={StudentList} isPrivate />
      <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
  );
}
