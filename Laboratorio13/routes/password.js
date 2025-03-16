const express = require('express');
const passwordController = require('../controllers/passwordController');

const router = express.Router();

router.get('/', passwordController.getPassword);

module.exports = router;
