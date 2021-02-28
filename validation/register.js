const Validator = require('validator');
const isEmpty = require('./isEmpty.js');

module.exports = function validateRegisterInput (data) {
	let errors = {};

	data.login = !isEmpty(data.login) ? data.login : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
	data.password2 = !isEmpty(data.password2) ? data.password2 : '';

	if (!Validator.isEmail(data.email)) {
		errors.email = 'Invalid email';
	}

	if (Validator.isEmpty(data.email)) {
		errors.email = 'Email field is required';
	}

	if (!Validator.isLength(data.login, { min: 4, max: 20 })) {
		errors.login = 'Login must between 4 and 20 characters';
	}

	if (Validator.isEmpty(data.login)) {
		errors.login = 'Login field is required';
	}

	if (!Validator.isLength(data.password, { min: 6, max: 20 })) {
		errors.password = 'Password must between 6 and 20 characters';
	}

	if (Validator.isEmpty(data.password)) {
		errors.password = 'Password field is required';
	}

	if (!Validator.equals(data.password, data.password2)) {
		errors.password2 = 'Passwords must match';
	}

	if (Validator.isEmpty(data.password2)) {
		errors.password2 = 'Confirm password field is required';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
}