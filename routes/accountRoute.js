const express = require('express');
const router = express.Router();
var accountController = require('../controllers/accountController')

router.get('/', accountController.homepage);
router.get('/signUp',accountController.register);
router.post('/signUp',accountController.save);
router.get('/signIn',accountController.signIn);
router.post('/signIn', accountController.processSignIn);
router.get('/signOut', accountController.signOut);
router.get('/detail/:id',accountController.detail);

module.exports = router;