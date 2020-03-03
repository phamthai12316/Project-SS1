
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get("/", categoryController.category);
router.get("/product", categoryController.getProduct);



module.exports = router;