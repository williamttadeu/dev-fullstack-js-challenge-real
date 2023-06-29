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

    IsRegisterDataValid = async (data)=>{
        if(data.name ==""){
            return "O nome é um campo obrigatório"
            };

        if(data.email ==""){
        return "O e-mail é um campo obrigatório"
        };

        if(data.ra ==""){
            return  "O RA é um campo obrigatório"
          };

        if(data.cpf ==""){
        return "O CPF é um campo obrigatório"
        }
    
        if(parseInt(data.ra) !=data.ra){
        return "O RA deve ser um número inteiro"
        }
    
        if(parseInt(data.cpf) !=data.cpf){
        return "O CPF deve ser um número inteiro"
        }

        const userExists = await this.app.database("students")
        .select()
        .where({ra:data.ra})
        .first()

        if(userExists){
          return  "Desculpe mas já existe um usuário cadastrado com esse RA"
          };
        

        return true

    }
    registerStudent = async (req,res)=>{
        const IsRegisterDataValid = await this.IsRegisterDataValid(req.body);
        if(IsRegisterDataValid !== true){
            return res.status(400).send({
                result: false,
                message: IsRegisterDataValid,
            })
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

    CheckIfEditDataIsValid = async(data)=>{
      if(data.name ==""){
        return "O nome é um campo obrigatório";
      }
      if(data.email ==""){
        return "O e-mail é um campo obrigatório";
      }

      return true

    }
    editStudentByRA = async (req,res)=>{
      const CheckIfEditDataIsValid = await this.CheckIfEditDataIsValid(req.body);
      if(CheckIfEditDataIsValid != true){
          return res.status(400).send({
              result: false,
              message: CheckIfEditDataIsValid,
          })
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