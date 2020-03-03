const express = require('express');
const router = express.Router();
var generalController = require ('../controllers/generalController');


router.get('/about', generalController.about);
router.get('/page', generalController.page);
router.get('/contact', generalController.contact);
router.post('/contact/send',generalController.sendContact);
module.exports = router;