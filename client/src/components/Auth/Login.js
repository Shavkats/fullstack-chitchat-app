import React, {Component} from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux'; 
import { withRouter } from 'react-router-dom';
import { loginUser } from '../../actions/authActions'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';

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
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: '#525C65'
  }
});

class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.auth.isAuthenticated){
            this.props.history.push('/')
        }
        if(nextProps.errors){
            this.setState({errors: nextProps.errors})
        }
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/");
        }
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e){
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        }

        this.props.loginUser(userData);
    }

    render(){
        const { errors } = this.state;
        const { classes } = this.props;
        return (
            <Container component='main' maxWidth='xs'>
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component='h1' variant='h5'>
                        Sign In
                    </Typography>
                    <form onSubmit={this.onSubmit} className={classes.form} noValidate>
                        <TextField
                            variant='outlined'
                            margin='normal'
                            fullWidth
                            autoFocus
                            id='email'
                            name='email'
                            label='Email Address' 
                            autoComplete='email'
                            error = {errors.email? true : false}
                            helperText={errors.email}
                            value={this.state.email}
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
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            color='primary'
                            className={classes.submit}
                            >
                            Sign In
                        </Button>
                    </form>
                </div>
            </Container>
            )
        }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {loginUser})(compose(withStyles(styles))(withRouter(Login)));