import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from '../components/auth/auth-help';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        auth.iaAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
