import React, {Component} from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../actions/authActions';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';

const styles = theme => ({
   paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: '#525C65'
  },
});

class Register extends Component{
    constructor(props){
        super(props)
        this.state = {
            email: '',
            login: '',
            password: '',
            password2: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors})
        }
    }


    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

	onSubmit (e) {
		e.preventDefault()
		const userData = {
			email: this.state.email,
			login: this.state.login,
			password: this.state.password,
			password2: this.state.password2
		}

		this.props.registerUser(userData, this.props.history)
	}

    render(){
    const {errors} = this.state;
    const {classes} = this.props;
    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Sign Up
                </Typography>
                <form onSubmit={this.onSubmit} className={classes.form} noValidate>
                    <TextField
                        variant='outlined'
                        margin='normal'
                        fullWidth
                        id='email'
                        name='email'
                        autoFocus
                        label='email'
                        autoComplete='email'
                        error = {errors.email ? true : false}
                        helperText={errors.email}
                        value={this.state.email}
                        onChange={this.onChange}
                    />
                    <TextField
                        variant='outlined'
                        margin='normal'
                        fullWidth
                        id='login'
                        name='login'
                        label='Login'     
			            error = {errors.login ? true : false}
			            helperText={errors.login}
                        value={this.state.login}
                        onChange={this.onChange}
                    />
                    <TextField
                        variant='outlined'
                        margin='normal'
                        fullWidth
                        id='password'
                        name='password'
                        label='Password'
                        type='password'
                        autoComplete='current-password'
                        error = {errors.password ? true : false}
                        helperText={errors.password}
                        value={this.state.password}
                        onChange={this.onChange}
                    />
                    <TextField
                        variant='outlined'
                        margin='normal'
                        fullWidth
                        id='password2'
                        name='password2'
                        label='Re-enter password'
                        type='password'
                        error = {errors.password2 ? true : false}
                        helperText={errors.password2}
                        value={this.state.password2}
                        onChange={this.onChange}
                    />
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.submit}
                        >
                        Sign Up
                    </Button>
                </form>
            </div>
        </Container>
        )
    }
}

const mapStateToProps = (state) => ({
	errors: state.errors
})

export default connect(mapStateToProps, {registerUser})(compose(withStyles(styles))(withRouter(Register)));