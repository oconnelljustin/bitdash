const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require ('bcryptjs')
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//loading validation of user input

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');


//User Model loading
const User = require('../../models/User');

router.get('/test', (req, res) => res.json({msg: "Users Works"}));

router.post('/register', (req, res) => {
    const {errors, isValid} = validateRegisterInput(req.body);
    
    //check registration
    
    if(!isValid) {
        return res.status(400).json(errors);

    }

    User.findOne({email: req.body.email})
    .then(user => {
        if(user) {
            errors.email = 'Email already exists';
            return res.status(400).json(errors);
        } else {
            const avatar = gravatar.url(req.body.email, {
               s: '200', //size
               r: 'pg', //rating
               d: 'mm' //default
            });
            
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));

                })
            })
        }
    });

});

//Login and JWT token return

router.post('/login', (req,res) => {

    //console.log(req.body)

    const {errors, isValid} = validateLoginInput(req.body);

   if(!isValid) {
    //console.log(errors)
       return res.status(400).json(errors);
       
   }
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
    .then(user=> {
    if(!user){
            errors.email = 'User not found';
            return res.status(404).json(errors);
        }

        //check password

        bcrypt.compare(password,user.password)
        .then(isMatch => {
            if(isMatch){

            const payload = {id: user.id, name: user.name, avatar: user.avatar};
            
            //Sign token

           // console.log('secret: ', keys.secretOrKey)
            
            jwt.sign(payload, 'this works',
                {expiresIn: 3600 },
            (err, token) => {
                //console.log(err, token)
                res.json({
                    success: true,
                    token: token
                });
            }

        );

            } else{
                errors.password = 'The password is incorrect';
                return res.status(400).json(errors);
            }
        });
    });

});


router.get('/current', 
passport.authenticate('jwt', {session: false}), 
(req, res) => {
res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
});

});

module.exports = router;
