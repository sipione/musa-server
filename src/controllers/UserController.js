const database = require("../models");
const Token = require("../tokens");
const { Op } = require("sequelize");
const nodemailer = require("nodemailer");

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
        const {page, category} = req.headers;
        const limit = 5;

        let where = {
            [Op.and] :[
                {category:  {[Op.not]:null}},
            ],
            blocked: false,
        }

        if(category){
            where = {
                [Op.and] :[
                    {category:  {[Op.not]:null}},
                    {category: category}
                ],
                blocked: false,
            }
        }

        try{
            const response = await database.User.findAll({
                attributes: { exclude: ['password']},
                order:[['createdAt', 'DESC']], 
                where, 
                limit,
                offset: Number(page)*limit
            });

            resp.status(200).json(response)
            
        }catch(err){
            resp.status(500).json(err.message)
        }
    }

    static async getTotal(req,resp){

        try{
            const total = await database.User.count({where: {category: {[Op.not]: null}}});
            resp.status(200).json(total);
        }catch(err){
            resp.status(500).json(err)
        }
    }

    static async getAllUsers(req,resp){

        try{
            const response = await database.User.findAll({
                attributes: { exclude: ['password']}
              });
            resp.status(200).json({message: response, quantidade})
        }catch(err){
            resp.status(500).json(err)
        }
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

    static async forgotPasswordEmail(req, resp){
        const {email} = req.body;
        
        const transporter = nodemailer.createTransport({
            host: process.env.HOSTMAIL_SMTP,
            port: process.env.PORTMAIL,
            secure: true,
            auth: {
              user: process.env.MAIL_USER, // generated ethereal user
              pass: process.env.MAIL_PASSWORD, // generated ethereal password
            },
        });

        
        try{
            const user = await database.User.findAll({where: { email }});

            if(user.length < 1) throw new Error("email inválido")

            const token = Token.createValidationToken({id: user[0].id});

            const textHtml = `
            <h1> Olá, esqueceu a senha? </h1>
    
            <h2> Não se preocupe, basta ascender ao link abaixo e redefinir sua senha! <h2/>
    
            <p> http://localhost:3000/#/change/${token}</p>
            `;

            await transporter.sendMail({
                from: '"Musa" <noreply@mulheressa.com.br>', 
                to: email, 
                subject: "Esqueci minha senha", // plain text body
                html: textHtml, // html body
            });
    
            console.log("enviado")

            resp.status(200).json(`Email enviado para ${email}`);

        }catch(err){
            console.log("peguei o erro: ", err)
            resp.status(500).json(err.message)
        }
    }

    static async changePassword(req, resp){
        const {newPassword, token} = req.body;

        try{
            const validation = Token.validateToken(token);
            const newPasswordHash = await database.User.hashPassword(newPassword);
            await database.User.update({password: newPasswordHash},{where: {id: validation.id}});
            resp.status(200).json("Senha alterada com sucesso");
        }catch(err){
            resp.status(500).json(err.message)
        }
    }
}

module.exports = UserController;