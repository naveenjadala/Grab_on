const express = require('express');
const router = express.Router();

const { createUser, getAllUser, loginUser } = require('../controllers/User.contorller');
const { verifyToken } = require('../utils/AuthenticationCheck');

router.post('/register', createUser);
router.get('/getUsers', verifyToken, getAllUser);
router.post('/login', loginUser);

module.exports = router;