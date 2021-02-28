import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';

const styles = theme => ({
	paper: {
		padding: 10,
		display: 'flex',	
		marginTop: 10,
	},
	avatar: {
		width: theme.spacing(7),
    	height: theme.spacing(7),
		alignSelf: 'center'
	},
	login: {
		marginBottom: 5
	},
	time: {
		marginLeft: 10,
		color: '#bbb',
		fontSize: 14
	}
});

class Post extends Component {
	render () {
		const { classes, post } = this.props
		return (
			<Paper className={classes.paper}>
				<div className={classes.avatar}>
					<Avatar src={post.user.avatar} />
				</div>
				<div>
					<h3 className={classes.login}>
						<Link to={`/profile/${post.user.id}`}>{post.user.login}</Link>
						<span className={classes.time}>{(new Date(post.createdAt)).toLocaleString()}</span>
					</h3>
					{post.text}
				</div>
			</Paper>
		);
	}
}


export default withStyles(styles)(Post);