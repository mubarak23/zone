import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';

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
