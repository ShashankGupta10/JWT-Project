const express = require('express');
const router = express.Router();
const { login, dashboard } = require('../controllers/main')
const Authentication = require('../middleware/auth')

router.route('/dashboard').get(Authentication, dashboard)
router.route('/login').post(login)


module.exports = router
