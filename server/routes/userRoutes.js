const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/login', userController.login);
router.post('/signup', userController.signup);
router.post('/verifyToken/:token', userController.verifyToken);
router.get('/getUser/:id', userController.getUser);
router.post('/updateRank/:userId', userController.updateRank);

module.exports = router;
