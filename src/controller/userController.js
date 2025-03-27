require("dotenv").config();
const db = require("../datebase/db.js");
const Md5 = require("md5");
const jwt = require("jsonwebtoken");


exports.Cadastro = async (req, res) => {
    try {
        const connection = await db.getConnection();
        
        const {nome, sobrenome, email, senha, dataRegistro} = req.body;
        if(!nome ) {
            return res.status(500).json({"error": "Nome inválido"});  
        }
        if(!sobrenome || nome.length < 3) {
            return res.status(500).json({"error": "sobrenome inválido"});  
        }
        if(!email || nome.length < 3) {
            return res.status(500).json({"error": "email inválido"});  
        }
        if(!senha || nome.length < 2) {
            return res.status(500).json({"error": "senha inválido"});  
        }
        const [rows] = await connection.query(`select * from usuario where email = ?`, [email]);

        if(rows.length > 0) {
            return res.status(400).json({"error": "email ja existente"}); 
        }
        console.log("3333333333333333333333333")
        const create = await connection.query(`insert into usuario (nome, email, senha, dataRegistro, ultimoAcesso) values (?, ?, ?, ?, ?)`, [(nome + " " + sobrenome), email, Md5(senha) ,dataRegistro, dataRegistro]);
        console.log(create)
        console.log("4444444444444444444444444")
        return res.status(200).json({msg: "Adicionado com sucesso"})
 
   
    
    } catch (error) {
  
        return res.status(500).json({"error": error.message});  
    }
    
}


exports.Login = async (req, res) => {
    try {
        const connection = await db.getConnection();
        console.log("1111111111111111111")
        const {login, password, dataAcesso} = req.body;
         console.log("22222222222222222")
        if(!login || login.length < 1) {
            return res.status(400).json({"error": "Email inválido"});  
        }
        if(!password || password.length < 1) {
            return res.status(400).json({"error": "Senha inválida"});  
        }
        if(!dataAcesso || dataAcesso.length < 1) {
            return res.status(400).json({"error": "Data inválida"});  
        }
        const usuario = (await connection.query(`select * from usuario where email = ?`, [login]));
        
        const email = usuario[0][0].email;
        const senha = usuario[0][0].senha;
        
        console.log("33333333333333333333")
        if(!usuario || !email || email !== login || !senha || senha !== Md5(password)){
            return res.status(401).json({"error": "Email ou senha incorretos"});  
        }
      
        await connection.query(
            `UPDATE usuario SET ultimoAcesso = ? WHERE email = ?`,
            [dataAcesso, login]
          );
        console.log("4444444444444444444444444")
        const CHAVE= process.env.SECRET;
        const token = jwt.sign(
              { email: email },
              CHAVE,
              { expiresIn: "1h" } 
          );
    
       
        connection.release()
        console.log("55555555555555555555")
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