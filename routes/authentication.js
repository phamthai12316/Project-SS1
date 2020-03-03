var Account = require('../models/account');

// Kiểm tra xem người dùng đã logged in hay chưa.
module.exports = function (req, res, next) {
    if(req.session && req.session.username){
        Account.findOne({
            'username':req.session.username
        }, function (err, account) {
            if(account){
                req.loggedIn = account;
            }
            next();
        })
    }else{
        next();
    }
}