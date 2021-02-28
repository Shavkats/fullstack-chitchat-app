import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostList from './Posts/PostList';
import Login from './Auth/Login';

class Home extends Component {
	
	render () {
		const { isAuthenticated } = this.props
		return (
			<div>
				{ isAuthenticated ? <PostList /> : <Login/ > }
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	isAuthenticated: !!state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Home)