import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core//Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import Delete from '@material-ui/icons/Delete';
import auth from '../components/auth/auth-help';
//import { deleteUser } from '../utils/api-user';
import { deleteUser } from '../util/api-user';
import { Redirect, Link } from 'react-router-dom';

class DeleteUser extends Component {
  state = {
    redirect: false,
    open: false
  };
  clickButton = () => {
    this.setState({ open: true });
  };

  deleteaccount = () => {
    const jwt = auth.isAuthenticated();
    deleteUser(
      {
        userId: this.props.userId
      },
      { t: jwt.token }
    ).then(data => {
      if (data.error) {
        console.log(data.error);
        return data.error;
      } else {
        auth.signout(() => console.log('Deleted'));
        this.setState({ redirect: true });
      }
    });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };
  render() {
    const redirect = this.state.redirect;
    if (redirect) {
      return <Redirect path='/' />;
    }
    return (
      <span>
        <IconButton
          aria-label='Delete'
          onClick={this.clickButton}
          color='secondary'
        >
          <Delete />
        </IconButton>

        <Dialog open={this.state.open} onClose={this.handleRequestClose}>
          <DialogTitle>{'Delete Account'}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Confirm to delete your account.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color='primary'>
              Cancel
            </Button>
            <Button
              onClick={this.deleteAccount}
              color='secondary'
              autoFocus='autoFocus'
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </span>
    );
  }
}

export default DeleteUser;
