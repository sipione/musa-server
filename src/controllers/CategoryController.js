const db =  require("../models");

class CategoryController{
    static async getAllCategories(req, resp){
        try{
            const categories = await db.Category.findAll();
            resp.status(200).json(categories);
        }catch(err){
            resp.status(500).json(err.message)
        }
    }

    static async CreateCategories(req, resp){
        const arrayOfCategories =  req.body;
        console.log(arrayOfCategories);
        try{
            arrayOfCategories.forEach(async item=>{
                await db.Category.create(item)
                console.log(`category ${item.label} created with success`)
            })

            resp.status(200).json("All categories created with success");
        }catch(err){
            resp.status(500).json(err.message)
        }

    }
}

module.exports = CategoryController;