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
