module.exports = function () {
    return function log(err, req, res, next) {
        if (req.xhr) {
            res.status(500).send({ error: 'XHR failed !!!' });
        }
        else {
            next(err);
        }
    }
}