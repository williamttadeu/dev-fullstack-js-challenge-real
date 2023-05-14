const express = require('express');
const knex = require('knex');
// to allow different ports access the API
var cors = require("cors")

let database = require("./database");
const knexConfigFile = require("../knexfile");

const app = express()


app.database = knex(knexConfigFile.test);

app.use(cors());
app.use(express.json());
//(app.use(cors());) after this line all "app" will use cors 

app.get('/', function (req, res) {
  res.send('Hello World')
});

//":searchQuery?" => It make optional and i can use the same endpoint
app.get("/students/list/:searchQuery?", function(req, res){
  let result = database;
  let search = req.params.searchQuery;
  console.log(search);

  if(search){
    search = search.toLowerCase();
    result = result.filter((student)=>{
      return student.ra == search||
      student.name.toLowerCase().indexOf(search) !=-1||
      student.cpf == search;
    });
  }

  return app.database("students")
            .select()
            .then((data)=>{
              console.log(data);
              res.send(data);
            });
  
});

app.get("/students/find/:ra", function(req,res){

  return app
    .database("students")
    .select()
    .where({ra : req.params.ra})
    .first()
    .then((response)=>{
      res.send(response);
    });  
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
  //verify if student exist
  //const studentFound
   return app.database("students")
  .select()
  .where({ra: req.params.ra})
  .first()
  .then((response)=>{
    if (response){
      return app.database("students")
      .update({
        name: req.body.name,
        email: req.body.email,
      })
      .where({
        ra: req.body.ra,
      })
      .then((response)=>{
        if(response){
          res.send({
            result: true,
            message: "Estudante atualizado com sucesso",
          });
        } else{
          res.status(500).send({
            result: false,
            message: "Desculpe, mas não conseguimos atualizar o estudante",
          });
        }
      });

    } else{
      return res.status(400).send({
        result: false,
        message: "O estudante informado não existe",
        });
    }
  });

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