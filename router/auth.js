const app = require('express').Router();
const User = require('../model/user');
const {registerValidation, loginValidation} = require('../validate');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

app.post('/register', async(req, res) => {

    //validate registration input
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //check if account already exists before registering
    const email = await User.findOne({email: req.body.email})
    if(email) return res.status(400).send('email exists already');

    //hash user password
    const saltRounds = 10;
    const userPassword = req.body.password;

    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const user = new User({
        name: req.body.name,
        password: hashedPassword,
        email: req.body.email
    })
    
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch(err) {
        res.status(400).send(err);
    }
})

app.post('/login', async(req, res) => {

    //validate login input
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Does user exist?
    const email = await User.findOne({email: req.body.email});
    if(!email) return res.status(400).send('user not found');

    //check user password
    const verifiedUser = await bcrypt.compare(req.body.password, email.password)
    if (!verifiedUser) return res.status(400).send('wrong password')
    console.log(verifiedUser)

    //assign json web token
    const token = jwt.sign({xUser: email._id}, process.env.jwt);
    res.header('xHeader', token).send(token);
})

module.exports = app;


