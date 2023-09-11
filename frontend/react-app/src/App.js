import './App.css';
import StudentListPage from './Components/Pages/StudentListPage';
import Navbar from './Components/Shared/NavBar';

function App() {
  return (
    <div className='main-container'>
      <Navbar/>
    <section className="container">
        <header className="main-header">Consulta de Alunos</header>
        <div className="content-page">
          <StudentListPage/>
        </div>
    </section>
    </div>
  );
}

export default App;
