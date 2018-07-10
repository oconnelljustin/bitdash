const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
    let errors = {};

    data.email = isEmpty(data.email) ? data.email : '';
    data.password = isEmpty(data.password) ? data.password : '';

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

    return {
        errors,
        isValid: isEmpty(errors)
    }
}