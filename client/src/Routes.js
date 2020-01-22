import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import PrivateRoutes from './components/PrivateRoute';
import Signin from './components/Signin';
import Profile from './components/Profile';
import Signup from './components/Signup';

class Routes extends Component {
  render() {
    return (
      <div>
        <Navbar />

        <Switch>
          <Route exact path='/' Component={Home} />
          <PrivateRoutes path='/user/edit/:userId' />
          <Route path='/user/:userId' Component={Profile} />
          <Route path='/singup' Component={Signup} />
          <Route path='/signin' Component={Signin} />
        </Switch>
      </div>
    );
  }
}

export default Routes;
