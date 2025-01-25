require("dotenv").config();


const express = require("express");
const app = express();
const port = process.env.PORT;
const cors = require("cors");
const path = require("path");
const session = require("express-session");

app.use(session({
    secret: process.env.SESSION_SECRET || "minha_chave_secreta", 
    resave: false, 
    saveUninitialized: false, 
    cookie: {
        maxAge: 3600000, 
        httpOnly: true, 
        secure: false
    }
}));

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'src/public')));

const funcRoutes = require("./src/routes/funcRoutes.js");
const userRoutes = require("./src/routes/userRoutes.js");
const dbConnection = require("./src/datebase/db.js");

app.set('views', path.join(__dirname, 'src/views/user'));
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index', { titulo: 'Bem-vindo à Escola' });
});

dbConnection().then(() => {

        app.use(userRoutes, funcRoutes);
        app.listen(port, async (req, res) => {
                console.log(`Rodou em http://localhost:${port}`);
        } )
})

