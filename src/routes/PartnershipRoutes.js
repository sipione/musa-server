const { Router } = require("express");
const { PartnershipController } = require("../controllers");

const router = Router();

router
    .post("/api/partnership", PartnershipController.sendMail);

module.exports = router;