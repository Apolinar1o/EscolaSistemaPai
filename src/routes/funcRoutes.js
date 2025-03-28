

console.log("111111111111111111111111111")
const express = require("express");
const router = express.Router();
const controller = require("../controller/crudController.js");
const authorization = require("../middleware/validarTokenJwt.js")
console.log("111111111111111111111111111")

router.get("/find/:entidade", authorization, controller.find)
// router.get("/find", controller.findOne)
router.post("/insert/responsavel", authorization, controller.insertResp)
router.post("/insert/aluno", authorization, controller.insertAluno)
router.delete("/delete/:entidade",  authorization, controller.deletar)
router.put("/atualizar/:entidade", authorization, controller.atualizar)



module.exports = router;