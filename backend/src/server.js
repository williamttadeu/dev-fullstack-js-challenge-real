const express = require('express');

const studentsRoutes = require("./Routes/studentsRoutes")
const knex = require('knex');
// to allow different ports access the API
var cors = require("cors")
const knexConfigFile = require("../knexfile");

const app = express()
app.database = knex(knexConfigFile.test);
app.use(cors());
app.use(express.json());

app.use("/students",studentsRoutes(app))

app.listen(3000);
console.log("serve is running");