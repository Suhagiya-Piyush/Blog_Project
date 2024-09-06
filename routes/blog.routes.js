const express = require('express');
const blogRoutes = express.Router();
const { addNewBlog, showBlogs } = require('../controller/blog.controller');
const { verifyToken } = require('../helpers/verifyToken');

blogRoutes.get('/show-blog',verifyToken, showBlogs);
blogRoutes.post('/add',verifyToken, addNewBlog);

module.exports = blogRoutes;