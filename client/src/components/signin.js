import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';
import auth from '../components/auth/auth-help';
import { Redirect } from 'react-router-dom';
import { signin } from '../../utils/api-auth.js';
import { CardActions } from '@material-ui/core';

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 2
  },
  error: {
    verticalAlign: 'middle'
  },
  title: {
    marginTop: theme.spacing.unit * 2,
    color: theme.palette.openTitle
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing.unit * 2
  }
});

class Signin extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    redirectToReferrer: false
  };

  clicksubmit = () => {
    const user = {
      email: this.state.email || 'undefined',
      password: this.state.password || 'undefined'
    };
    signin(user).then(data => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        auth.iaAuthenticated(data, () => {
          this.setState({ redirectToReferrer: true });
        });
      }
    });
  };
  handleChange = (name = event => {
    this.setState({ [name]: event.target.value });
  });
  render() {
    const { classes } = this.props;
    const { from } = this.props.location.state || {
      from: {
        pathname: '/'
      }
    };
    const { redirectToReferrer } = this.state;
    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (
      <div>
        <Card className={classes.Card}>
          <CardContent>
            <Typography
              type='headline'
              component='h2'
              className={classes.title}
            >
              Sign In
            </Typography>
            <TextField
              id='email'
              type='email'
              label='email'
              className={classes.TextField}
              value={this.state.email}
              onChange={this.handleChange('email')}
              margin='normal'
            />
            <br />
            <TextField
              id='password'
              type='password'
              label='Password'
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange('password')}
              margin='normal'
            />
            <br />{' '}
            {this.state.error && (
              <Typography componet='p' color='error'>
                <Icon color='error' className={classes.error}>
                  error
                </Icon>
                {this.state.error}
              </Typography>
            )}
          </CardContent>
          <CardActions>
            <Button
              color='primary'
              variant='raised'
              onClick={this.clicksubmit}
              className={classes.submit}
            >
              Sign In
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(Signin);
