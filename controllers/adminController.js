const Product = require('../models/product');
require('mongoose-pagination');


exports.newProduct = function (req, res) {
            var title = 'New Product';
            var responseData = {
            'session': req.session,
            'title': title,
            'obj': req.body,
        };
        res.render('admin/newProduct', responseData);
};

exports.save = function (req, res) {
    var obj = new Product(req.body);
    obj.save(function (err) {
        if (err) {
            return res.status(500).send(err);
        } else {
            var resposonseData = {
                'session': req.session,
            };
            return res.render('admin/newProduct', resposonseData);
        }
    });
};

exports.listProduct = function (req, res) {
    var page = req.query.page || 1;
    var limit = req.query.limit || 10;
    var responseData;
    var keyword = req.query.keyword;
    var query;
    if (keyword) {
        var searchPara = {
            productName: {
                $regex: keyword, "$option": "i"
            }
        };
        query = Product.find(searchPara);
    } else {
        query = Product.find();
    }
    query = query.where('status').ne(-1);
    query.paginate(parseInt(page), parseInt(limit),
        function (err, listData, totalItem) {
                responseData = {
                    'listData': listData,
                    'totalPage': Math.ceil(totalItem / limit),
                    'page': page,
                    'limit': limit,
                    'keyword': keyword,
                    'session': req.session,
                };
                res.render('admin/listProduct', responseData);
        });
};
