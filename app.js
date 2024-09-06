require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const ejs = require('ejs');
const cookieParser = require("cookie-parser");
const port = process.env.PORT;
const { verifyToken } = require('./helpers/verifyToken');
const app = express();

app.set('view engine', 'ejs');

// const User = require('./model/user.model');
const Blogs = require('./model/blog.model');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.render('register.ejs');
});

app.get('/login', (req, res) => {
    res.render('login.ejs');
});

app.get('/home',verifyToken,async (req, res)=>{
    // console.log("new", req.user);
    // console.log(req.user._id);
    // console.log(req.user);
    const blog = await Blogs.find({userId : req.user._id}).sort({createdAt: -1});
    console.log(blog);
    

    res.render('blog.ejs', {user : req.user, blog})
});

const userRoutes = require('./routes/user.routes');
const blogRoutes = require('./routes/blog.routes');

app.use('/api/user', userRoutes);
app.use('/api/blog',verifyToken, blogRoutes);

app.listen(port, (req, res) => {
    mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Database connection established successfully...'))
    .catch(err=>console.log(err));
    console.log(`Server Start at http://localhost:${port}`); 
})