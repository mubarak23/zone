import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import { Link } from 'react-router-dom';
import { registerUser } from '../util/api-user';

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  error: {
    verticalAlign: 'middle'
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  }
});

class Signup extends Component {
  state = {
    name: '',
    password: '',
    email: '',
    open: '',
    error: ''
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  clicksubmit = () => {
    const user = {
      name: this.state.name || undefined,
      email: this.state.email || undefined,
      password: this.state.password || undefined
    };

    registerUser(user).then(data => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({ open: true, error: '' });
      }
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
            <Typography
              type='headline'
              component='h2'
              className={classes.title}
            >
              Sign Up
            </Typography>
            <TextField
              id='name'
              name='name'
              label='Name'
              className={classes.textField}
              value={this.state.name}
              onChange={this.handleChange('name')}
              margin='normal'
            />
            <br />
            <TextField
              id='email'
              type='email'
              name='email'
              label='Email'
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange('email')}
              margin='normal'
            />
            <br />
            <TextField
              id='password'
              type='password'
              name='password'
              label='Password'
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange('password')}
              margin='normal'
            />
            <br />{' '}
            {this.state.error && (
              <Typography component='p' color='error'>
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
              onClick={this.clickSubmit}
              className={classes.submit}
            >
              Sign Up
            </Button>
          </CardActions>
        </Card>
        <Dialog open={this.state.open} disableBackdropClick={true}>
          <DialogTitle>New Account</DialogTitle>
          <DialogContent>
            <DialogContentText>
              New account successfully created.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Link to='/signin'>
              <Button color='primary' autoFocus='autoFocus' variant='raised'>
                Sign In
              </Button>
            </Link>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(Signup);
