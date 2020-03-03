var express = require('express');
var router = express.Router();
var adminController = require('../controllers/adminController');

router.get("/newProduct", adminController.newProduct);
router.post("/newProduct", adminController.save);
router.get("/listProduct", adminController.listProduct);

module.exports = router;