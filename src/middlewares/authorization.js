
class MiddlewareAuth{

    static validateJWT(req, resp, next){
        console.log("to aqui, mas pode passar ;p");
        next()
    }
}

module.exports = MiddlewareAuth;