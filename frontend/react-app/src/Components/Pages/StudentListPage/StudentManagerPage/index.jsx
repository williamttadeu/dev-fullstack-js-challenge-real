import "./style.css"

const StudentManagerPage =()=>{
    return  (
        <>
            <header class="main-header">Consulta de Alunos</header>

<div class="loader"></div>
<div class="content-page padding-left-right-20">
    <form class="form" id="studentForm" method="post">
        <div class="form-group">
            <label for="name">Nome</label>
            <input type="text" name="name" id="name" placeholder="Informe o nome completo" required/>
        </div>
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" name="email" id="email" placeholder="Informe o nome e-mail" required/>
        </div>
        <div class="form-group">
            <label for="ra">RA</label>
            <input type="text" name="ra" id="ra" placeholder="Informe o nome registro acadêmico" required/>
        </div>
        <div class="form-group">
            <label for="cpf">CPF</label>
            <input type="number" name="cpf" id="cpf" placeholder="Informe o número do documento" required/>
        </div>

        <div class="actions">
            <a href="studentsList.html" class="btn btn-warning ">Cancelar</a>
            
            <a href="studentsList.html" class="btn">
                <button class="btn">
                Salvar
                </button>
            </a>
          
        </div>
    </form>
    
    </div>
        </>
    )
}

export default StudentManagerPage;