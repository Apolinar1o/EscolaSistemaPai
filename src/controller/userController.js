require("dotenv").config();
const db = require("../datebase/db.js");


exports.Cadastro = async (req, res) => {
    try {
        const connection = await db();
        const {nome, sobrenome, email, senha, dataRegistro} = req.body;

        if(!nome || nome.length < 1) {
            return res.status(500).json({"error": "Nome inválido"});  
        }
        if(!sobrenome || sobrenome.length < 1) {
            return res.status(500).json({"error": "sobrenome inválido"});  
        }
        if(!email || email.length < 1) {
            return res.status(500).json({"error": "email inválido"});  
        }
        if(!senha || senha.length < 1) {
            return res.status(500).json({"error": "senha inválido"});  
        }
     
        const create = await connection.query(`insert into usuario (nome, email, senha, dataRegistro) values ("${nome  +" "+ sobrenome}","${email}","${senha}","${dataRegistro}")`);
        if(create) {
            return res.status(200).json(create);
        }
    } catch (error) {
        return res.status(500).json({"error": error.message});  
    }
    
}


exports.Login = async (req, res) => {
    try {
        const connection = await db();
        const {login, password, dataAcesso} = req.body;

        if(!login || login.length < 1) {
            return res.status(500).json({"error": "Email inválido"});  
        }
        if(!password || password.length < 4) {
            return res.status(500).json({"error": "Senha inválido"});  
        }
        if(!dataAcesso || dataAcesso.length < 1) {
            return res.status(500).json({"error": "Data inválido"});  
        }
       
        const create = await connection.query(`insert into aluno (nome, endereco, sexo, resp_id, dataNascimento) values ("${nome}", "${endereço}","${sexo}","${resp_id}","${dataNascimento}")`);
        if(create) {
            return res.status(200).json(create);
        }
    } catch (error) {
        return res.status(500).json({"error": error.message});  
    }
    
}