module.exports = function(options) {
    return function(req, res, next){
        console.log('my logger mw with options');
        console.log(JSON.stringify(options));
        next();
    }
}