import "./style.css";

const Navbar = () =>{
    return(
        <nav className="main-nav">
        <header>Módulo Acadêmico</header>

        <ul className="nav-links">
            <a className="nav-item" href="studentsList.html">
                <li>Alunos</li>
            </a>
        </ul>
    </nav>

    );
};

export default Navbar;