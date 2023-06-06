const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.post('/createMessage', messageController.createMessage);


module.exports = router;
