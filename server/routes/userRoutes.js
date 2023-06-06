// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/login', userController.login);
router.post('/signup', userController.signup);
router.get('/getUser/:id', userController.getUser);
router.get('/getMessages/:userId', userController.getMessages);

module.exports = router;
