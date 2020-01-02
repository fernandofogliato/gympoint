import React from 'react';

import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import StudentList from '~/pages/Student/list';
import StudentForm from '~/pages/Student/form';
import PlanList from '~/pages/Plan/list';
import PlanForm from '~/pages/Plan/form';
import EnrollmentList from '~/pages/Enrollment/list';
import EnrollmentForm from '~/pages/Enrollment/form';
import HelpOrderList from '~/pages/HelpOrder/index';

import FormLayout from '~/pages/_layouts/form';
import ListLayout from '~/pages/_layouts/list';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route
        path="/students/:id"
        component={StudentForm}
        isPrivate
        layout={FormLayout}
      />
      <Route
        path="/students"
        component={StudentList}
        isPrivate
        layout={ListLayout}
      />

      <Route
        path="/plans/:id"
        component={PlanForm}
        isPrivate
        layout={FormLayout}
      />
      <Route path="/plans" component={PlanList} isPrivate layout={ListLayout} />

      <Route
        path="/enrollments/:id"
        component={EnrollmentForm}
        isPrivate
        layout={FormLayout}
      />
      <Route
        path="/enrollments"
        component={EnrollmentList}
        isPrivate
        layout={ListLayout}
      />

      <Route
        path="/help-orders"
        component={HelpOrderList}
        isPrivate
        layout={ListLayout}
      />
      <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
  );
}
