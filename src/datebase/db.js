require("dotenv").config(); 
const db = require("mysql2/promise");

// Função para conectar ao banco de dados
const conectar = async () => {
    try {
        const connection = await db.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'hyslla21',
            database: 'celcb',
          });
        console.log("Conectado ao MySQL com sucesso!");
        return connection;
    } catch (err) {
        console.error("Erro ao conectar ao MySQL:", err.stack);
        throw err;
    }
};



module.exports = conectar;