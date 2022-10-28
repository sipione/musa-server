const bodyParser = require("body-parser");
const UserRoutes = require("./UserRoutes");
const CategoryRoutes = require("./CategoryRoutes");
const ImageRoutes = require("./ImageRoutes");
const PartnershipRoutes = require("./PartnershipRoutes");

module.exports = app=>{
    app.use(
        bodyParser.json(),
        UserRoutes,
        CategoryRoutes,
        ImageRoutes,
        PartnershipRoutes
    )
}