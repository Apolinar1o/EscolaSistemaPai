require("dotenv").config();
const db = require("../datebase/db.js");
const Md5 = require("md5");
const jwt = require("jsonwebtoken");
const session = require("express-session");

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
       
        const usuario = (await connection.query(`select * from usuario where email = ?`, [email]));
        
        if(usuario[0].length > 0 ) {
            return res.status(500).json({"error": "Email ja existente"});
        }

        if(!senha || senha.length < 1) {
           
            return res.status(500).json({"error": "senha inválido"});  
        }
        if(!dataRegistro || dataRegistro.length < 1) {
            return res.status(500).json({"error": "Data inválida"});  
        }
  
        const create = await connection.query(`insert into usuario (nome, email, senha, dataRegistro, ultimoAcesso) values (?, ?, ?, ?, ?)`, [(nome + " " + sobrenome), email, Md5(senha) ,dataRegistro, dataRegistro]);

        if(create) {
            
            return res.status(200).json({ message: "Usuário cadastrado com sucesso" });
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
        if(!password || password.length < 1) {
            return res.status(500).json({"error": "Senha inválida"});  
        }
        if(!dataAcesso || dataAcesso.length < 1) {
            return res.status(500).json({"error": "Data inválida"});  
        }
        const usuario = (await connection.query(`select * from usuario where email = ?`, [login]));

        const email = usuario[0][0].email;
        const senha = usuario[0][0].senha;

        if(!usuario || !email || email != login || !senha || senha != Md5(password)){
            return res.status(500).json({"error": "Email ou senha incorretos"});  
        }

        await connection.query(
            `UPDATE usuario SET ultimoAcesso = ? WHERE email = ?`,
            [dataAcesso, login]
          );
        
        const CHAVE= process.env.SECRET;
        const token = jwt.sign(
              { email: email },
              CHAVE,
              { expiresIn: "1h" } // Token expira em 1 hora
          );
          
          req.session.user = {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
        };

        return res.status(200).json({ 
            mensagem: 'Login bem-sucedido',
            email: email,
            nome: usuario[0][0].nome,
            token: token
        });
        
          
    } catch (error) {
        return res.status(500).json({"error": error.message});  
    }
    
}