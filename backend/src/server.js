const express = require('express');
const studentsController = require("./controllers/studentController")
const knex = require('knex');
// to allow different ports access the API
var cors = require("cors")
const knexConfigFile = require("../knexfile");

const app = express()
app.database = knex(knexConfigFile.test);
app.use(cors());
app.use(express.json());
//(app.use(cors());) after this line all "app" will use cors 
//Instantiate the controllers class, due to there aren't static methods
const studentControllerInstance = new studentsController(app);

//":searchQuery?" => It make optional and i can use the same endpoint
app.get("/students/list/:searchQuery?", studentControllerInstance.listStudents);

app.get("/students/find/:ra", studentControllerInstance.findStudentByRA);

app.post("/students/save", studentControllerInstance.registerStudent);

app.put('/students/edit/:ra',studentControllerInstance.editStudentByRA);

app.delete("/students/delete/:ra",studentControllerInstance.deleteStudent);


  




app.listen(3000);
console.log("serve is running");