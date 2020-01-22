import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Home from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';
import auth from './auth/auth-helper';
import { Link, withRouter } from 'react-router-dom';

const isActive = (path, history) => {
  if (history.location.pathname == path) return { color: '#F44336' };
  else return { color: '#ffffff' };
};
const Menu = withRouter(({ history }) => (
  <AppBar position='static'>
    <Toolbar>
      <Typography type='title' color='inherit'>
        ZONE KADUNA
      </Typography>
      <Link to='/'>
        <IconButton aria-label='Home' style={isActive(history, '/')}>
          <Home />
        </IconButton>
      </Link>
      {!auth.isAuthenticated() && (
        <span>
          <Link to='/signup'>
            <Button style={isActive(history, '/signup')}>Sign up</Button>
          </Link>
          <Link to='/signin'>
            <Button style={isActive(history, '/signin')}>Sign In</Button>
          </Link>
        </span>
      )}
      {auth.isAuthenticated() && (
        <span>
          <Link to={'/user/' + auth.isAuthenticated().user._id}>
            <Button
              style={isActive(
                history,
                '/user/' + auth.isAuthenticated().user._id
              )}
            >
              My Profile
            </Button>
          </Link>
          <Button
            color='inherit'
            onClick={() => {
              auth.signout(() => history.push('/'));
            }}
          >
            Sign out
          </Button>
        </span>
      )}
    </Toolbar>
  </AppBar>
));
