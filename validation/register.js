const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.name = isEmpty(data.name) ? data.name : '';
    data.email = isEmpty(data.email) ? data.email : '';
    data.password = isEmpty(data.password) ? data.password : '';
    data.password2 = isEmpty(data.password2) ? data.password2 : '';

    if(!validator.isLength(data.name, {min: 6, max: 30})){
        errors.name = 'Name must be between 2 and 30 characters';
    }

    if(validator.isEmpty(data.name)) {
        errors.name = 'name field is required';
    }

    if(validator.isEmpty(data.email)) {
        errors.email = 'name field is required';
    }

    if(!validator.isEmail(data.email)) {
        errors.name = 'email is invalid';
    }

    if(validator.isEmpty(data.password)) {
        errors.password = 'password field is required';
    }

    if(validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = 'password must be between 6 and 30 characters long';
    }

    if(Validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm password field required';
    }

    if(!validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords do not match';
    }



    return {
        errors,
        isValid: isEmpty(errors)
    }
}