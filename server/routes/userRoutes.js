const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/login', userController.login);
router.post('/signup', userController.signup);
router.get('/getUser/:id', userController.getUser);
router.get('/getMessages/:userId', userController.getMessages);
router.post('/updateRank/:userId', userController.updateRank); // Ajoutez cette ligne

module.exports = router;
