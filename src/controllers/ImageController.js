const db = require("../models");


class ImageController{

    static async getImages(req, resp){
        
        try{
            const images = await db.Image.findAll()
            resp.status(200).json(images)

        }catch(err){
            resp.status(500).json(err.message)
        }
    }
    
    static async getImagesbyUserId(req, resp){
        const {id} =  req.params;
        
        try{
            const images_path = await db.Image.findAll({where:{user_id: id}})
            resp.status(200).json(images_path)

        }catch(err){
            resp.status(500).json(err.message)
        }
    }

    static async getAvatar(req, resp){
        const {id} =  req.params;
        
        try{
            const images_path = await db.Image.findAll({where:{user_id: id, role: "avatar"}})
            resp.status(200).json(images_path)

        }catch(err){
            resp.status(500).json(err.message)
        }
    }

    static async postImages(req, resp){
        const imgData = req.body;

        try{
            const tryFindOrCreate = await db.Image.findOrCreate({where: {user_id: imgData.user_id, role: imgData.role}, defaults: imgData})

            console.log(tryFindOrCreate);

            if(!tryFindOrCreate[1]){
                await db.Image.update(imgData, {where: {user_id: imgData.user_id, role: imgData.role}})
            } 

            resp.status(201).json("image in the database");

        }catch(err){
            resp.status(500).json(err.message)
        }
    }

    static async updateImage(req, resp){
        const {id} = req.params;
        const {role, description} = req.body;
        console.log(description)

        try{
            await db.Image.update({description: description}, {where: {user_id: id, role: role}})
            resp.status(201).json("image updated in the database");
            
        }catch(err){
            resp.status(500).json(err.message)
        }
    }

    static async deleteImage(req,resp){
        const { id } = req.params;

        try{
            await db.Image.destroy({where: {id}});
            resp.status(200).json("image deleted with success")
        }catch(err){
            resp.status(500).json(err.message)
        }
    }
}

module.exports = ImageController;