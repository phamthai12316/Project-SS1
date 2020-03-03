const mongoose = require('mongoose');
const crypto = require('crypto');
const saltLength = 7;
const algorithName = 'sha256';
const Schema = mongoose.Schema;
// const Joi = require('@hapi/joi');
// var validateEmail = function(email) {
//     var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     return re.test(email);
// };


var AccountSchema  = new Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        required: [true, 'Username is not defined']
    },
    email: {
        type: String,
        required: [true, 'Email is not defined']
    },
    password: {
        type: String,
        minlength: [6, 'Min 6 char'],
        maxlength:[16,'Max 16 char '],
        required: [true, 'Password is not defined']
    },
    role: {
        type: Number,
        default: '1'
    },
    salt: {
        type: String
    }
});


AccountSchema.pre('save', function (next) {
    var obj = this;
    var salt = generateSalt(saltLength); // Create Salt
    var algorith = crypto.createHmac(algorithName, salt); // Create Algorith.
    var passwordHash = algorith.update(obj.password).digest('hex'); // Password Hash
    obj.password = passwordHash;
    obj.salt = salt;
    next();
});

AccountSchema.statics.authenticate = function (username, password, callback) {
    Account.findOne({
        'username': username
    }, function (error, account) {
        if (error || !account) {
            var err = new Error('Member not found.');
            err.status = 401;
            return callback(err);
        } else {
            var inputPassword = password;
            var salt = account.salt;
            var passwordHash = account.password;

            var algorith = crypto.createHmac(algorithName, salt); // Create Algorith.
            var passwordHashToCompare = algorith.update(inputPassword).digest('hex'); // Password Hash.
            if (passwordHashToCompare === passwordHash) {
                return callback(null, account);
            } else {
                var err = new Error('Member not found.');
                err.status = 401;
                return callback(err);
            }
        }
    });
}

function generateSalt(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
AccountSchema.index({username: 'text'});
var Account = mongoose.model('account',AccountSchema);
module.exports = Account;
