const User = require('../model/user.model');
const jwt = require('jsonwebtoken');
exports.verifyToken = async (req, res, next) => {
    try {
        const authorization = req.cookies.user_token;
        // console.log(authorization);
        
        if(!authorization){
            return res.json({message : 'Not Authorization'});
        }
        const payload = jwt.verify(authorization, process.env.JWT_SECRET);  
        // console.log('payload',payload);
        if(!payload){
            return res.status(401).json({message : 'Unauthorized'});
        }
        const user = await User.findOne({_id:payload.userId, isDeleted : false});
        // console.log('user',user);
        if(!user){
            return res.status(404).json({message : 'User Not Found...'});
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({message : 'Internal Server Error...'});
    }
}
