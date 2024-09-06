const User = require('../model/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

 exports.createNewUser = async (req, res) => {
    try {
        // console.log(req.body);
        let user = await User.findOne({email : req.body.email, isDeleted : false});
        if (user){
            return res.status(400).json({message : 'User Already Register...Go to Login Page'});
        }
        const hashPassword = bcrypt.hashSync(req.body.password, 10);
        user = await User.create({...req.body, password : hashPassword});
        // res.status(201).json({message : 'User Registration Success....'})
        return res.redirect('/login');
    } catch (error) {
        console.log(error);
        res.status(500).json({message : 'Internal Server Error...'});
    }
 }

 exports.userLogin = async (req, res) => {
    try {
        // console.log(req.body);
        const user = await User.findOne({email : req.body.email, isDeleted : false});
        if(!user){
            return res.status(404).json({message : 'User not Found...'});
        }
        const isMatchPass = bcrypt.compareSync(req.body.password, user.password);
        if(!isMatchPass) {
            return res.status(400).json({message : 'Password not Match...'});
        }
        const token = jwt.sign({userId : user._id}, process.env.JWT_SECRET);
        res.cookie("user_token", token);
        return res.redirect('/home');
    } catch (error) {
        console.log(error);
        res.status(500).json({message : 'Internal Server Error...'});
    }
 }

 