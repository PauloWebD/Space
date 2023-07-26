const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/allUsers', adminController.getAllUsers);
router.get('/updateRank', adminController.updateRank);
router.delete('/deleteUser/:userId', adminController.deleteUser);

module.exports = router;
