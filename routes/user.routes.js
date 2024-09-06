const express = require('express');
const userRoutes = express.Router();
const { createNewUser , userLogin } =  require('../controller/user.controller');

userRoutes.post('/register', createNewUser);
userRoutes.post('/login', userLogin);

module.exports = userRoutes;