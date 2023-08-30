import React from "react";
import "./style.css";

class StudentListPage extends React.Component{

    constructor(properties){
        console.log("chamado o construtor", properties)
        super(properties)
        this.state={
            studentList:[],

        }
    }
    
    componentDidMount(){
        alert('Compenete acontencendo')
        this.fetchStudentsList()

    }

    fetchStudentsList=(searchQuery = "")=>{

        // $(".loader").show("fast");
        // $(".content-page").hide("slow");
        
        fetch(`http://localhost:3006/students/list/${searchQuery}`)
        .then(response => response.json())
        .then(data => {
            this.setState({ studentList: data });
            console.log(data);
        })
        .catch(error => {
            console.log(error);
        });
    
    }


    render(){
        return(
            <div className="padding-left-right-20">
                
                <div className="top-actions">
                    <form id="formSearchStudent" className="form-search">
                        <input type="text" name='searchInput' id="searchInput" placeholder="Digite sua Busca"/>
                        <button>Pesquisar</button>
                    </form>

                    <a className="btn btn-dark" href="studentManager.html">Cadastrar Aluno</a>
                
                </div>

                <table id="studentList" className="table-list">
                    <thead>
                        <tr>
                            <th>Registro acadêmico</th>
                            <th>Nome</th>
                            <th>CPF</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.studentList.map((student)=>{

                            return(
            
                                <tr>
                                    <td>{student.ra}</td>
                                    <td>{student.name}</td>
                                    <td>{student.cpf}</td>
                                    <td>
                                        <a href={`studentManager.html?/ra=${student.ra}`}>Editar</a>
                                        <a id="" data-ra={student.ra} class="removeStudent" href="/#">Excluir</a>
                                    </td>
                                </tr>
                            );
                          
                        })}
                    </tbody>
                </table>
            </div>

        )
    }
}


export default StudentListPage;