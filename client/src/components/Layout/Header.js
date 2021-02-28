import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Menu from '@material-ui/core/Menu';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVert from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import { logoutUser } from '../../actions/authActions'

const styles = {
	root: {
		flexGrow: 1
	},
	logo: {
		color: '#fff',
        textDecoration: 'none',
        fontFamily: ['Lobster', 'Roberto', '"Helvetica Neue"'],
        fontStyle: 'cursive',
        fontSize: '2rem'
	},
    links: {
        textDecoration: 'none',
        color: '#525C65'
    },
	space: {
		justifyContent: 'space-between'
	}
}

class Header extends Component {
	constructor (props) {
		super(props);
		this.state = {
			anchorEl: null
		}
		this.handleLogout = this.handleLogout.bind(this);
	}

	handleMenu = (event) => { this.setState({ anchorEl: event.currentTarget })}
	handleClose = () => { this.setState({ anchorEl: null })}
	handleLogout () {
		this.setState({ anchorEl: null });
		this.props.logoutUser();
	}

	render () {
		const { classes, isAuthenticated, user } = this.props;
		const { anchorEl } = this.state;
		const open = Boolean(anchorEl);

		const guestLinks = (
			<div>
				<IconButton
					aria-owns={ open ? 'menu-appbar': undefined }
					aria-haspopup="true"
					color="inherit"
					onClick={this.handleMenu}
				>
					<MoreVert />
				</IconButton>
				<Menu
					id="menu-appbar"
					open={open}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right'
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'right'
					}}
					anchorEl={anchorEl}
					onClose={this.handleClose}
				>
					<MenuItem onClick={this.handleClose}>
						<Link to="/login" className={classes.links}>Login</Link>
					</MenuItem>
					<MenuItem onClick={this.handleClose}>
						<Link to="/register" className={classes.links}>Register</Link>
					</MenuItem>
				</Menu>
			</div>
		)

		const authLinks = isAuthenticated && (
			<div>
				<IconButton
					aria-owns={ open ? 'menu-appbar': undefined }
					aria-haspopup="true"
					color="inherit"
					onClick={this.handleMenu}
				>
				    <Avatar src={user.avatar} />
				</IconButton>
				<Menu
					id="menu-appbar"
					open={open}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right'
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'right'
					}}
					anchorEl={anchorEl}
					onClose={this.handleClose}
				>
					<MenuItem onClick={this.handleClose}>
						<Link to={`/profile/${user._id}`}>Profile</Link>
					</MenuItem>
					<MenuItem >
						<Link to="/#" onClick={this.handleLogout}>Logout</Link>
					</MenuItem>
				</Menu>
			</div>
		)
		return (
			<div className={classes.root}>
				<AppBar position="static" style={{ backgroundColor: '#525C65'}}>
					<Toolbar className={classes.space}>
						<Link to="/" className={classes.logo}>Chit-Chat</Link>
						{ isAuthenticated ? authLinks : guestLinks }
					</Toolbar>
				</AppBar>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	user: state.auth.user
})

export default connect(mapStateToProps, { logoutUser })(withStyles(styles)(Header))