import './App.css';
import StudentListPage from './Components/Pages/StudentListPage';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './Components/Shared/NavBar';

function App() {
  return (
    <BrowserRouter>
    <div className='main-container'>
      <Navbar/>
    <section className="container">
        <header className="main-header">Consulta de Alunos</header>
        <div className="content-page">
        <Routes>
          <Route path='/' element={<StudentListPage/>} />

          <Route path='/student-manager' element={<h1>Student manager pga</h1>} />
          
          
        </Routes>
        </div>
    </section>
    </div>
    

    <StudentListPage/>
    
    
    </BrowserRouter>

    
  );
}

export default App;
