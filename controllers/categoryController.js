const Product = require('../models/product');

exports.getProduct = function (req, res) {
    Product.findById(req.query.id).exec(function (err, listData) {
            if (err) {
                return res.status(500).send(err);
            } else {
                var responseData = {
                    'listData': listData,
                    'session':req.session
                };
                res.render('category/product', responseData);
            }
        })
};


exports.category = function (req, res) {
    var page = req.query.page || 1;
    var limit = req.query.limit || 9;
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
    if (req.query.category) {
        query = query.where('productCategory').equals(req.query.category);
    }
    query = query.where('status').ne(-1);
    query.paginate(parseInt(page), parseInt(limit),
        function (err, listData, totalItem) {
        Product.find().then(function (allProducts) {
            let categories = [];
            let brands =[];
            allProducts.forEach(function (product) {
                if (!categories.includes(product.productCategory || !brands.includes(product.productBrand))) {
                    categories.push(product.productCategory);
                    brands.push(product.productBrand);
                }
            });

            responseData = {
                'allProducts': allProducts,
                'listData': listData,
                'categories': categories,
                'brands':brands,
                'totalPage': Math.ceil(totalItem / limit),
                'page': page,
                'limit': limit,
                'keyword': keyword,
                'session': req.session,
            };
            res.render('category/category', responseData);
        });
    });
};

