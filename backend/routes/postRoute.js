const express = require('express');
const router = express.Router();
const { createBook, showBook, showSingleBook, deleteBook, updateBook, addComment, addLike, removeLike } = require('../controllers/postControllers');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

//book rota
router.post('/post/create', isAuthenticated, isAdmin, createBook);
router.get('/posts/show', showBook);
router.get('/post/:id', showSingleBook);
router.delete('/delete/post/:id', isAuthenticated, isAdmin, deleteBook);
router.put('/update/post/:id', isAuthenticated, isAdmin, updateBook);
router.put('/comment/post/:id', isAuthenticated, addComment);
router.put('/addlike/post/:id', isAuthenticated, addLike);
router.put('/removelike/post/:id', isAuthenticated, removeLike);




module.exports = router;
