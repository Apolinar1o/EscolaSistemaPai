require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT;

const routes = require("./src/routes/routes.js")
const dbConnection = require("./src/datebase/db.js");

dbConnection().then(() => {
        app.use(express.json());
        app.use(routes);
        app.listen(port, async (req, res) => {
                console.log(`Rodou em http://localhost:${port}`);
        } )
})

