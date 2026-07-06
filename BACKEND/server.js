const express = require("express");
const port = 5000;

const db = require("./src/db")
const routes = require("./src/routes")
const app = express();  

db()

app.use(express.json())
app.use(routes)
app.listen(port, () => console.log("le serveur a demarre au port " + port));