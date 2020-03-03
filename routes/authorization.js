module.exports = function (...allowed) {

    function isAllowed(role) {
        return allowed.indexOf(role) > -1;
    }

    return function (req, res, next) {
        if(req.loggedIn && isAllowed(req.loggedIn.role)){
            next();
        } else {
            var err = new Error('Forbidden');
            err.status = 403;
            next(err);
        }
    }
};