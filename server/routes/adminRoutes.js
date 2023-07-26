const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/allUsers', adminController.getAllUsers); // Assurez-vous que getAllUsers est bien défini dans le contrôleur

router.delete('/deleteUser/:userId', adminController.deleteUser); // Assurez-vous que deleteUser est bien défini dans le contrôleur

router.put('/updateUserRank/:userId', adminController.updateUserRank);

module.exports = router;
