require("dotenv").config();


const express = require("express");
const app = express();
const port = process.env.PORT;
const cors = require("cors");
const path = require("path");


app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000",  
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

const funcRoutes = require("./src/routes/funcRoutes.js");
const userRoutes = require("./src/routes/userRoutes.js");
const dbConnection = require("./src/datebase/db.js");


        app.use(userRoutes, funcRoutes);
        app.listen(port, async (req, res) => {
                console.log(`Rodou em http://localhost:${port}`);
        } )


