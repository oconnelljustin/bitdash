const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data) {
    let errors = {};

    data.school = !isEmpty(data.school) ? data.school : '';
    data.degree = !isEmpty(data.degree) ? data.degree : '';
    data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';

    if(Validator.isEmpty(data.school)) {
        errors.school = 'a school is required';
    }

    if(Validator.isEmpty(data.degree)) {
        errors.degree = 'a degree is required';
    }

    if(Validator.isEmpty(data.fieldofstudy)) {
        errors.fieldofstudy = 'field of study is required';
    }

    if(Validator.isEmpty(data.from)) {
        errors.from = 'a from field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}