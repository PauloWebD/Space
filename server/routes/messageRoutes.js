const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.post('/createMessage', messageController.createMessage);
router.get('/getMessages/:planet', messageController.getMessages);


module.exports = router;
