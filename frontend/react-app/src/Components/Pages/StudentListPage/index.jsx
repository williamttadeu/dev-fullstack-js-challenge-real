import React from "react";
import "./style.css";
import Loader from "../../Shared/NavBar/Loader";
import {Link} from "react-router-dom"
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2"

class StudentListPage extends React.Component{

    constructor(properties){
        super(properties)
        this.state={
            studentList:[],
            isLoading:true,
            formSearch: {
                searchInput: "",
            },

        }
    }
    
    componentDidMount(){
        this.fetchStudentsList()

    }

    onClickRemoveStudent =(ra)=>{
        Swal.fire({
            title: 'Você deseja realmente excluir esse estudante?',
            text: "Você não será capaz de reverter essa operação",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, Delete'
          }).then((result) => {
            if (result.isConfirmed) {
                this.onClickDeleteStudent(ra);
              Swal.fire(
                'Deletado!',
                'Estudante Deletado com sucesso',
                'success',
                '9000'
              )
            }
          })
          

    }

    onClickDeleteStudent = (ra) =>{
        this.setState({isLoading: true})

        fetch(`http://localhost:3006/students/delete/${ra}`,{
                method:"DELETE"
            }).then((response)=>{
                
                return response.json();
            }).then((data)=>{

                // Swal.fire({
                    
                //     icon: 'success',
                //     title: 'Parabéns',
                //     text: data.message,
                //     showConfirmButton: false,
                // })

                this.fetchStudentsList();
            });
    
    };

    onSubmitFormSearch = (event)=>{
        event.preventDefault();
        this.fetchStudentsList(event.target.searchInput.value);

    };

    fetchStudentsList=(searchQuery = "")=>{
        this.setState({isLoading: true})
        fetch(`http://localhost:3006/students/list/${searchQuery}`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            this.setState({ 
                studentList: data,
                isLoading: false

             });
        })
        .catch(error => {
            console.log(error);
        });
    
    }


    render(){

         if(this.state.isLoading){
             return <Loader />
         }
        return(
            <>
            <header className="main-header">Lista de Alunos</header>
            <div className="padding-left-right-20">                               
                <div className="top-actions">
                    <form onSubmit={this.onSubmitFormSearch} id="formSearchStudent" className="form-search">
                        <input type="text" name='searchInput' id="searchInput" value={this.state.formSearch.searchInput} 
                        onChange={(event)=>{
                            this.setState({
                                formSearch:{
                                    searchInput:event.target.value,
                                },
                            });
                        }}  placeholder="Digite sua Busca"/>
                        <button>Pesquisar</button>
                    </form>
                    <Link className="btn btn-dark" to="student/add">Cadastrar Aluno</Link>
                
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
            
                                <tr key={student.ra}>
                                    <td>{student.ra}</td>
                                    <td>{student.name}</td>
                                    <td>{student.cpf}</td>
                                    <td>
                                        <Link to={`/student/edit/${student.ra}`}>Editar</Link>
                                        <a id="" className="removeStudent" href="/#" onClick={()=>{this.onClickRemoveStudent(student.ra)}}>Excluir</a>
                                        {/* <Link to="/#" id="" className="removeStudent">Excluir</Link> */}
                                    </td>
                                </tr>
                            );
                          
                        })}
                    </tbody>
                </table>
            </div>
        
            </>
        )
    }
}


export default StudentListPage;