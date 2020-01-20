import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import PrivateRoutes from './components/PrivateRoute';

class Routes extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' Component={Home} />
        </Switch>
      </div>
    );
  }
}

export default Routes;
