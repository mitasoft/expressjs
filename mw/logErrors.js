module.exports = function() {
    return function log(err, req, res, next) {
        console.error(err.stack);
        next(err);
    }
}