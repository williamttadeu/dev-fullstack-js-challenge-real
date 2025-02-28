import "./style.css"
import { useState, useEffect } from "react";
import Loader from "../../../Shared/NavBar/Loader";
import { Navigate,Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const StudentManagerPage =()=>{

    const {id} = useParams()
    const [isRedirect, setIsRedirect] = useState(false)
    const [isLoading,updateIsLoading] = useState(false)

    const[name, updateName] =useState("")
    const[email, updateEmail] =useState("")
    const[cpf, updateCpf] =useState("")
    const[ra, updateRa] =useState("")
    const[raReadonly, updateRaReadonly] = useState(false)
    const[cpfReadonly, updateCpfReadonly] = useState(false)




    const fetchStudent=()=>{

        updateIsLoading(true)
        fetch(`http://localhost:3006/students/find/${id}`)
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                updateName(data.name)
                updateCpf(data.cpf)
                updateEmail(data.email)
                updateRa(data.ra)    
                updateIsLoading(false)
            });
    }

      useEffect(()=>{
         if(id){
            fetchStudent();
            updateRaReadonly (true)
            updateCpfReadonly (true)
            }
      },[])


    const  onSubmitForm = (event) =>{
        event.preventDefault();
        //take the values of forms
        const body ={
            name,
            cpf,
            ra,
            email,
        };

        //To avoid code repetition
        let methodEndpoint;
        let urlEndpoint;

        if(id){
            methodEndpoint = "PUT";
            urlEndpoint = `http://localhost:3006/students/edit/${id}`;
        }else{
            methodEndpoint = "POST";
            urlEndpoint = `http://localhost:3006/students/save`;
        }
        
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
            
            //alert(data.message);
            if(data.result){
                Swal.fire('Parabéns',data.message,'success')
                setIsRedirect(true)
            //document.location.href = "/";
            }else{
                Swal.fire('Desculpe...',data.message,'error')
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
                <div className="card">
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
                            <input type="text" name="ra" id="ra" placeholder="Informe o nome registro acadêmico" value={ra} readOnly={raReadonly} onChange={(event)=>{
                                updateRa(event.target.value)
                            }} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="cpf">CPF</label>
                            <input type="number" name="cpf" id="cpf" placeholder="Informe o número do documento" value={cpf} readOnly={cpfReadonly} onChange={(event)=>{
                                updateCpf(event.target.value)
                            }} required/>
                        </div>

                        <div className="actions">
                            <Link className="btn btn-warning " to="/">Cancelar</Link>

                            {/* <Link to="/" className="btn"> */}
                                <button className="btn btn-dark">
                                Salvar
                                </button>
                            {/* </Link> */}
                        </div>
          
        
                    </form>
                </div>
    
    </div>
        </>
    )
}

export default StudentManagerPage;