const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    if(!Validator.isLength(data.name, {min: 6, max: 35})){
        errors.name = 'Name must be between 6 and 35 characters';
    }

    if(Validator.isEmpty(data.name)) {
        errors.name = 'name field is required';
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = 'email is required';
    }

    if(!Validator.isEmail(data.email)) {
        errors.name = 'name is invalid';
    }

   if(Validator.isEmpty(data.password)) {
        errors.password = 'password field is required';
   }

    if(!Validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = 'password must be between 6 and 30 characters long';
    }

   if(Validator.isEmpty(data.password2)) {
       errors.password2 = 'Confirm password field required';

}


    if(!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords do not match';
    }



    return {
        errors,
        isValid: isEmpty(errors)
    };

};
