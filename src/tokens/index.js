const jwt = require("jsonwebtoken");


class Token{

    static createAccessToken(payload){
        const accessToken = jwt.sign(payload, process.env.PRIVATE_KEY_JWT, {
            expiresIn: '1d'
        })

        return accessToken;
    }

    static validateToken(token){
        const result = jwt.verify(token, process.env.PRIVATE_KEY_JWT);
        return result;
    }
}

module.exports = Token;