const express = require("express");
const router = express.Router();
const controller = require("../controller/userController.js");


router.post("/cadastro", controller.Cadastro);
router.post("/login", controller.Login);



module.exports = router;