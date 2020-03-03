const Account = require('../models/account');
const Product = require('../models/product');
var mongoose = require('mongoose');


exports.homepage = function (req, res) {
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
                res.render('home', responseData);
            });
};


exports.register = function(req,res) {
    var title = 'Sign Up';
    var responseData = {
        'session': req.session,
        'title': title,
        'obj': req.body,
    };
    res.render('account/signUp',responseData);
};
exports.save = function (req, res) {
    var obj = new Account(req.body);
    obj.save(function (err) {
        if (err) {
            res.status(500).send(err);
        } else {
            req.session._id = obj.id;
            req.session.username = obj.username;
            req.session.email = obj.email;
            req.session.role = obj.role;
            return res.redirect('/');
        }
    });
};

exports.signIn = function (req, res) {
    var title = 'Sign In';
    var responseData = {
        'session': req.session,
        'title': title,
        'account': true,
    };
    res.render('account/signIn',responseData);
};
exports.processSignIn = function (req, res) {
    Account.authenticate(req.body.username, req.body.password, function (error, account) {
        if (error) {
            return res.status(401).send(error);
        } else if (!account) {
            var err = new Error('Wrong email or password.');
            err.status = 401;
            res.send(err);
        } else {
            req.session._Id = account.id;
            req.session.username = account.username;
            req.session.email = account.email;
            req.session.role = account.role;
            var responseData = {
                'session': req.session
            };
            res.redirect('/');
        }
    });
};
exports.signOut = function (req, res) {
    req.session.destroy(function (err) {
        return res.redirect('/');
    });
};
exports.detail = function (req, res) {
    Account.findById(req.params.id).exec(function (err, obj) {
        if (err) {
            return res.status(500).send(err);
        } else {
            var responseData = {
                'obj': obj,
                'session':req.session
            };
            res.render('account/detail', responseData);
        }
    })
};