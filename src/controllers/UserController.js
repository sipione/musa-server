const database = require("../models");
const Token = require("../tokens");
const { Op } = require("sequelize");

class UserController{

    static async registerUser(req, resp){
        
        try{
            const userData = {
                ...req.body, 
                password: await database.User.hashPassword(req.body.password),
                role: "ordinary",
                blocked:false,
                confirmed:false
            };
            
            const newUser = await database.User.findOrCreate({where: {email: userData.email}, defaults: userData})

            if(!newUser[1]){
                throw new Error("this email already exists")
            }

            const accessToken = Token.createAccessToken({id: newUser[0].id, role: newUser[0].role})

            resp.status(200).json({id: newUser[0].id, jwt: accessToken, name: newUser[0].name});

        }catch(err){
            console.log(err)
            resp.status(500).json({message: `was not possible to do the register, ${err.message}`})
        }
    }

    static async loginUser(req, resp){
        const loginData = req.body
        
        try{
            const user = await database.User.findAll({where: {email: loginData.email}})

            if(!user){
                throw new Error("invalid user or password")
            }

            await database.User.validatePassword(loginData.password, user[0].password)
            
            const accessToken = Token.createAccessToken({id: user[0].id, role: user[0].role});

            resp.set("Authorization", accessToken);

            resp.status(200).json({ 
                jwt: accessToken, 
                id: user[0].id,
                name: user[0].name
            });
            
        }catch(err){
            resp.status(500).json({message: `was not possible to do the login, ${err.message}`})
        }
    }

    static async getAllProfessionalUsers(req,resp){

        try{
            const response = await database.User.findAll({
                attributes: { exclude: ['password']}, 
                where:{
                    category: {[Op.not]:null},
                    blocked: false
                } 
            });

            resp.status(200).json(response)
            
        }catch(err){
            resp.status(500).json(err.message)
        }
    }

    static async getAllUsers(req,resp){
        const response = await database.User.findAll({
            attributes: { exclude: ['password']} 
          });
        resp.status(200).json({message: response})
    }

    static async getUserById(req, resp){
        const { id } = req.params;
        console.log(id)
        const {authorization} = req.headers;
        try{
            const verifyToken = Token.validateToken(authorization)
            console.log(verifyToken);
            if(verifyToken.id === id || verifyToken.role !== 'ordinary'){
                const user = await database.User.findAll({attributes: { exclude: ['password']}, where: {id}});
                resp.status(200).json(user[0])
            }else{
                throw new Error("You don't have authorization to request user info")
            }
        }catch(err){
            console.log(err.message)
            resp.status(401).json({error: err.message, message: "was not possible to get the user"})
        }
    }

    static async updateUser(req, resp){
        const { id } = req.params;
        const data = req.body;
        delete data.id
        delete data.blocked
        delete data.confirmed
        delete data.role
        
        try{
            await database.User.update(data, {where: {id}})
            resp.status(200).json(`The user with id ${id} was updated`)    
        }catch(err){
            resp.status(500).json(err)
        }
    }

    static async deleteUser(req, resp){
        const { id } = req.params;
        await database.User.destroy({where: {id}});
        resp.status(200).json(`The user with id ${id} was deleted`)
    }
}

module.exports = UserController;