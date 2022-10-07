const bodyParser = require("body-parser");
const UserRoutes = require("./UserRoutes");
const CategoryRoutes = require("./CategoryRoutes");
const ImageRoutes = require("./ImageRoutes");

module.exports = app=>{
    app.use(
        bodyParser.json(),
        UserRoutes,
        CategoryRoutes,
        ImageRoutes
    )
}