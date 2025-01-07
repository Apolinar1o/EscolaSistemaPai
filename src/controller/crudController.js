require("dotenv").config();
const db = require("../datebase/db.js");


exports.find = async (req, res) => {

    try {
        const { entidade } = req.params;
        const connection = await db();
        const [rows] = await connection.query(`select * from ${entidade} `);
        return res.status(200).json(rows)
    } catch (error) {
        return res.status(500).json({"error": error.message});  
    }
   
 
}

exports.findOne = async (req, res) => {
    
    try {
        const connection = await db();
        let id = 2;
        const [rows] = await connection.query(`select * from aluno where id = ${id}`);
        console.log(rows)

        return res.status(200).json(rows)
    } catch (error) {
        return res.status(500).json({"error": error.message});  
    }

}

exports.insertAluno = async (req, res) => {
    try {
        const connection = await db();
        const {nome, endereço, resp_id, sexo, dataNascimento} = req.body;
        const create = await connection.query(`insert into aluno (nome, endereco, sexo, resp_id, dataNascimento) values ("${nome}", "${endereço}","${sexo}","${resp_id}","${dataNascimento}")`);
        if(create) {
            return res.status(200).json(create);
        }
    } catch (error) {
        return res.status(500).json({"error": error.message});  
    }
    
}
exports.insertResp = async (req, res) => {
    try {
        const connection = await db();
        const {nome, endereço, cpf, sexo} = req.body;
        const create = await connection.query(`insert into responsavel (nome, endereco, cpf, sexo) values ("${nome}", "${endereço}","${cpf}","${sexo}")`);
        if(create) {
            return res.status(200).json(create);
        }

    } catch (error) {
        return res.status(500).json({"error": error.message});  
    }
    
}
exports.deletar = async (req, res) => {
    try {
        const {entidade} = req.params;
        const {nome} = req.body;
        const connection = await db();
        const deletar = await connection.query(`DELETE FROM ${entidade} WHERE nome='${nome}'`);
        if(deletar) {
            return res.status(200).json(deletar);
        }
    } catch (error) {
        return res.status(500).json({"error": error.message});  
    }
   
}
exports.atualizar = async (req, res) => {
    try {
        const {entidade} = req.params;
        const {value, alt, cpf} = req.body;
        const connection = await db();
        const deletar = await connection.query(`UPDATE ${entidade} SET ${alt} = '${value}' WHERE cpf = ${cpf}`);
        if(deletar) {
            return res.status(200).json(deletar);
        }
    } catch (error) {
        return res.status(500).json({"error": error.message});  
    }
   
}
