module.exports = class studentsController{
    constructor(app){
        this.app =app;
    }

    listStudents = (req,res)=>{
        let query = this.app.database("students");
        let search = req.params.searchQuery;
        
        if(search){
            query.where("ra",search)
            .orWhere("name","like",`%${search}%`)
            .orWhere("cpf",search);
        }
        
        //table that i will work
        return query
            .select()
            .then((data)=>{
            res.send(data);
            });
    };

    findStudentByRA = (req,res)=>{
        let query = this.app.database("students");
        return query
            .select()
            .where({ra : req.params.ra})
            .first()
            .then((response)=>{
            res.send(response);
            });  
    };

    registerStudent = async (req,res)=>{
        if(req.body.name ==""){
            return res.status(400).send({
              result: false,
              message: "O nome é um campo obrigatório",
            });
          }
          if(req.body.email ==""){
            return res.status(400).send({
              result: false,
              message: "O e-mail é um campo obrigatório",
            });
          }
          if(req.body.ra ==""){
            return res.status(400).send({
              result: false,
              message: "O RA é um campo obrigatório",
            });
          }
          if(req.body.cpf ==""){
            return res.status(400).send({
              result: false,
              message: "O CPF é um campo obrigatório",
            });
          }
        
          if(parseInt(req.body.ra) !=req.body.ra){
            return res.status(400).send({
              result: false,
              message: "O RA deve ser um número inteiro",
            });
          }
        
          if(parseInt(req.body.cpf) !=req.body.cpf){
            return res.status(400).send({
              result: false,
              message: "O CPF deve ser um número inteiro",
            });
          }
        
          const userExists = await this.app.database("students")
          .select()
          .where({ra:req.body.ra})
          .first()
        
        if(userExists){
          return res.status(400).send({
            result: false,
            message: "Desculpe mas já existe um usuário cadastrado com esse RA",
          });
        }
        
        
          return this.app.database("students")
          .insert({
            name: req.body.name,
            ra: req.body.ra,
            email: req.body.email,
            cpf: req.body.cpf,
          })
          .then((response)=>{
            if(response){
              res.send({
                result: true,
                message: "Estudante cadastrado com sucesso",
              });
            } else{
              res.status(500).send({
                result: false,
                message: "Não foi possível cadastrar o estudante",
              })
            }
          });
    };

    editStudentByRA = async (req,res)=>{
        if(req.body.name ==""){
            return res.status(400).send({
              result: false,
              message: "O nome é um campo obrigatório",
            });
          }
          if(req.body.email ==""){
            return res.status(400).send({
              result: false,
              message: "O e-mail é um campo obrigatório",
            });
          }
        
          const userFound = await this.app
            .database("students")
            .select()
            .where({ra: req.params.ra})
            .first();
        
            if(!userFound){
              return res.status(400).send({
                result: false,
                message: "O estudante informado não existe",
                });
            }
        
              const studentUpdate = await this.app
              .database("students")
              .update({
                name: req.body.name,
                email: req.body.email,
              })
              .where({
                ra: req.body.ra,
              });
        
              if(studentUpdate){
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

    };

    deleteStudent =  (req,res)=>{
        return this.app.database('students')
            .where({ra:req.params.ra})
            .del()
            .then((response)=>{
            if(response){
                res.send({
                result:true,
                message: `O estudante #${req.params.ra} foi excluido com sucesso`,
                });
            } else{
                res.send({
                result:false,
                message: `Não foi possível excluir o estudante`,
                });
            }
            });
    }
}