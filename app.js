require("dotenv").config();


const express = require("express");
const app = express();
const port = process.env.PORT || 300;
const cors = require("cors");
const path = require("path");

app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000",  
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

const funcRoutes = require("./src/routes/funcRoutes.js");
const userRoutes = require("./src/routes/userRoutes.js");
const dbConnection = require("./src/datebase/db.js");


        app.use(userRoutes);
        app.use(funcRoutes);
        app.listen(port, () => {
                console.log(`Rodou em http://localhost:${port}`);
        } )


