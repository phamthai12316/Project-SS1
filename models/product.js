const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ProductSchema = new Schema({
    productName: String,
    productPrice: String,
    productBrand: String,
    productOrigin: String,
    productVoltage: String,
    productWarranty: String,
    productDocs: String,
    productImage: String,
    productCategory: String,
});

var Product = mongoose.model('product',ProductSchema);
module.exports =  Product;