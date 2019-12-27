import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import AuthLayout from '~/pages/_layouts/auth';
import DefaultLayout from '~/pages/_layouts/default';
import FormLayout from '~/pages/_layouts/form';
import ListLayout from '~/pages/_layouts/list';

import { store } from '~/store';

export default function RouteWrapper({
  component: Component,
  isPrivate = false,
  layout,
  ...rest
}) {
  const { signed } = store.getState().auth;

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/students" />;
  }

  const Layout = !signed ? AuthLayout : layout;

  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  layout: PropTypes.oneOf([DefaultLayout, AuthLayout, FormLayout, ListLayout]),
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
  layout: DefaultLayout,
};
