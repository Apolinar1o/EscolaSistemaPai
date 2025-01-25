const jwt = require("jsonwebtoken")

const ValidarJwt = async (req, res, next) => {
    try {
        const secret = process.env.SECRET;
        if (!secret) {
            return res.status(401).json({erro: 'env do jwt não enviada'});
        }
        if(!req || !req.headers) {
            return res.status(401).json({erro: 'Nao foi possivel validar o token de acesso'});
        }

        if (req.method === "OPTIONS") {
            return next(); // Ignora validação 
        }


            const authorization = req.headers['authorization'];
            if(!authorization){
                return res.status(401).json({erro: 'Nao foi possivel validar o token de acesso'});
            }

            const token = authorization && authorization.split(' ')[1]
            if(!token){
                return res.status(401).json({erro: 'Nao foi possivel validar o token de acesso'});
            }
            console.log(token)
            jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                    return res.status(401).json({ error: 'Token inválido' });
                }
                req.user = decoded;

            });
              return next();
       
    } catch (err) {
        console.error("Erro ao conectar ao MySQL:", err.stack);
        return res.status(401).json({erro: 'Nao foi possivel validar o token de acesso'});
    }
};

module.exports = ValidarJwt;