const express = require('express')
// to allow different ports access the API
var cors = require("cors")

let database = require("./database");

const app = express()

app.use(cors());
app.use(express.json());
//(app.use(cors());) after this line all "app" will use cors 

app.get('/', function (req, res) {
  res.send('Hello World')
});

app.get("/students/list", function(req, res){
  setTimeout(function(){
    res.send(database);
  },2000);

  
})

app.get("/students/find/:ra", function(req,res){
  const studentFound = database.find(function(student){
    return student.ra == req.params.ra;
  });

  setTimeout(function(){
    res.send(studentFound);{}
  },2000);

  
});

app.post("/students/save", (req, res)=>{
  //add data in database
  database.push({
    name: req.body.name,
    ra: req.body.ra,
    email: req.body.email,
    cpf: req.body.cpf,
  });
  //const newStudent  =
  console.log(req.body);
  res.send({result:true, message: "Estudante cadastrado com sucesso"}); 
});

//edit is sum of delete and add a new user
app.put('/students/edit/:ra',(req,res)=>{
  //delete
  database = database.filter((student)=>{
    return student.ra != req.params.ra;
  });
  //after that you add
  database.push({
    name: req.body.name,
    ra: req.body.ra,
    email: req.body.email,
    cpf: req.body.cpf,
  });
  res.send({result:true, message: "Estudante ALTERADO com sucesso"});
})


app.delete("/students/delete/:ra",(req,res)=>{
  database = database.filter((student)=>{
    return student.ra != req.params.ra;
  });
  res.send({
    result:true,
    message: `O estudante #${req.params.ra} foi excluido com sucesso`});
})




app.listen(3000);
console.log("serve is running");