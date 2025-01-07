const express = require("express");
const router = express.Router();
const controller = require("../controller/crudController.js");


router.get("/:entidade", controller.find)
router.get("/find", controller.findOne)
router.post("/insert/responsavel", controller.insertResp)
router.post("/insert/aluno", controller.insertAluno)
router.delete("/delete/:entidade", controller.deletar)
router.put("/atualizar/:entidade", controller.atualizar)



module.exports = router;