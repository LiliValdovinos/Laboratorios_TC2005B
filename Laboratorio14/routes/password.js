const express = require('express');
const passwordController = require('../controllers/passwordController');

const router = express.Router();

router.get('/', passwordController.getPassword);
router.post('/login', passwordController.postLogin);
router.post('/logout', passwordController.logout);

module.exports = router;
