import "./style.css"
import { useState } from "react";
import Loader from "../../../Shared/NavBar/Loader";
import { Navigate,Link } from "react-router-dom";

const StudentManagerPage =()=>{

    const [isRedirect, setIsRedirect] = useState(false)
    const [isLoading,updateIsLoading] = useState(false)

    const[name, updateName] =useState("")
    const[email, updateEmail] =useState("")
    const[cpf, updateCpf] =useState("")
    const[ra, updateRa] =useState("")

    const isEditingMode = ()=>{
        return false
    }

    const getRaFromUrl = ()=>{
        return 0
    }

    const  onSubmitForm = (event) =>{
        event.preventDefault();
        //take the values of forms
        const body ={
            name,
            cpf,
            ra,
            email,
        };
        console.log(body)

        //To avoid code repetition
        let methodEndpoint;
        let urlEndpoint;

        if(isEditingMode()){
            methodEndpoint = "PUT";
            urlEndpoint = `http://localhost:3006/students/edit/${getRaFromUrl()}`;
        }else{
            methodEndpoint = "POST";
            urlEndpoint = `http://localhost:3006/students/save`;
        }
        console.log(methodEndpoint,urlEndpoint);

         fetch(urlEndpoint, {
            method: methodEndpoint,
            body: JSON.stringify(body),
            headers:{
                Accept: "application/json",
                "Content-Type": "application/json",
                    },
            })
            .then((response)=>{
                return response.json();
            })
            .then((data)=>{
                alert(data.message);
                if(data.result){
                    setIsRedirect(true)
                document.location.href = "/";
                }
            });
    }

    if(isRedirect){
        return <Navigate to='/' />
    }

    if(isLoading){
        return < Loader />
    }
    
    return  (
        <>
            <header className="main-header">Consulta de Alunos</header>

            {/* <div className="loader"></div> */}
            <div className="content-page padding-left-right-20">
                <form className="form" id="studentForm" method="post" onSubmit={onSubmitForm}>
                <div className="form-group">
                <label htmlFor="name">Nome</label>
                <input type="text" name="name" id="name" placeholder="Informe o nome completo" value={name} onChange={(event)=>{
                updateName(event.target.value)
                    }} required/>
            </div>

        <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" placeholder="Informe o nome e-mail" value={email} onChange={(event)=>{
                updateEmail(event.target.value)
            }} required/>
        </div>
        <div className="form-group">
            <label htmlFor="ra">RA</label>
            <input type="text" name="ra" id="ra" placeholder="Informe o nome registro acadêmico" value={ra} onChange={(event)=>{
                updateRa(event.target.value)
            }} required/>
        </div>
        <div className="form-group">
            <label htmlFor="cpf">CPF</label>
            <input type="number" name="cpf" id="cpf" placeholder="Informe o número do documento" value={cpf} onChange={(event)=>{
                updateCpf(event.target.value)
            }} required/>
        </div>

        <div className="actions">
            <Link className="btn btn-warning " to="/">Cancelar</Link>

            <Link to="/" className="btn">
                <button className="btn">
                Salvar
                </button>
            </Link>
          
        </div>
    </form>
    
    </div>
        </>
    )
}

export default StudentManagerPage;