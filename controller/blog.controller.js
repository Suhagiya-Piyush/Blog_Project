const Blog = require('../model/blog.model');

exports.showBlogs = async (req, res) => {
    try {
        const blog = await Blog.find({userId : req.users._id});
        console.log(blog);
        
        res.render('blog.ejs', {blog});
    } catch (error) {
        console.log(error);
        res.status(500).json({message : 'Internal Server Error...'});
    }
};

exports.addNewBlog = async (req, res) => {
    try {
        // console.log(req.body);
        await Blog.create({...req.body, userId : req.user._id});
        res.redirect('/home');
    } catch (error) {
        console.log(error);
        res.status(500).json({message : 'Internal Server Error...'});
    }
}