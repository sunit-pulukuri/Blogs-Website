const express = require('express')
const router = express.Router();
const {createBlog, getAllBlogs, myBlogs, deleteBlog, updateBlog, addComment, blog_by_id} = require('../controllers/blog-controller.js')
const authMiddleware = require('../middlewares/auth-middleware.js')


router.post('/create',authMiddleware, createBlog);
router.get('/all',authMiddleware, getAllBlogs)
router.get('/myblogs',authMiddleware, myBlogs)
router.get('/:id',authMiddleware, blog_by_id)
router.delete('/delete/:id', authMiddleware, deleteBlog)
router.put('/update/:id',authMiddleware, updateBlog)
router.put('/addcomment/:id',authMiddleware, addComment)
module.exports = router;
