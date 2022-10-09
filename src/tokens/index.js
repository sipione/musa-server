const jwt = require("jsonwebtoken");


class Token{

    static createAccessToken(payload){
        const accessToken = jwt.sign(payload, process.env.PRIVATE_KEY_JWT, {
            expiresIn: '1d'
        })

        return accessToken;
    }

    static validateToken(token){

        try{
            const result = jwt.verify(token, process.env.PRIVATE_KEY_JWT);
            return result;
        }catch(err){
            throw new Error("o token não pode ser validado")
        }
    }

    static createValidationToken(payload){
        const validationToken = jwt.sign(payload, process.env.PRIVATE_KEY_JWT, {
            expiresIn: '1h'
        })

        return validationToken;
    }
}

module.exports = Token;