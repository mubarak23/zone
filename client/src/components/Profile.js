import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Person from '@material-ui/icons/Person';
import Divider from '@material-ui/core/Divider';
import auth from '../components/auth/auth-help';
import { findUserProfile } from '../../utils/api-user.js';
import { Redirect, Link } from 'react-router-dom';
import DeleteUser from './DeleteUser';

const styles = theme => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 5
  }),
  title: {
    margin: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 2}px`,
    color: theme.palette.protectedTitle
  }
});

class Profile extends Component {
  constructor({ match }) {
    super(props);
    this.state = {
      user: '',
      redirectTosignin: false
    };
    this.match = match;
  }
  init = userId => {
    const jwt = auth.iaAuthenticated();
    findUserProfile(
      {
        userId: userId
      },
      { t: jwt.token }
    ).then(data => {
      if (data.error) {
        this.setState({ redirectTosignin: true });
      } else {
        this.setState({ user: data });
      }
    });
  };

  componentWillReceiveProps = props => {
    this.init(this.match.params.userId);
  };

  componentDidMount = () => {
    this.init(this.match.params.userId);
  };
  render() {
    const { classes } = this.props;
    const redirectTosignin = this.state.redirectTosignin;
    if (redirectTosignin) {
      <Redirect to='signin' />;
    }
    return (
      <Paper className={classes.root} elevation={4}>
        <Typography type='title' className={classes.title}>
          Profile
        </Typography>
        <List dense>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <Person />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={this.state.user.name}
              secondary={this.state.user.email}
            />{' '}
            {auth.isAuthenticated().user &&
              auth.isAuthenticated().user._id == this.state.user._id && (
                <ListItemSecondaryAction>
                  <DeleteUser userId={this.state.user._id} />
                </ListItemSecondaryAction>
              )}
          </ListItem>
          <Divider />
        </List>
      </Paper>
    );
  }
}
export default withStyles(theme)(Profile);
