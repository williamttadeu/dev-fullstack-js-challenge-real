import './App.css';
import StudentListPage from './Components/Pages/StudentListPage';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './Components/Shared/NavBar';
import StudentManagerPage from './Components/Pages/StudentListPage/StudentManagerPage';

function App() {
  return (
    <BrowserRouter>
    <div className='main-container'>
      <Navbar/>
    <section className="container">
        <div className="content-page">
        <Routes>
          <Route path='/' element={<StudentListPage/>} />

          <Route 
            path='/student/add' 
            element={<StudentManagerPage/>}
           />

          <Route 
            path='*' 
            element={<div className="padding-left-right-20">
              <h1>Erro 404</h1>
              <p>Desculpe, não conseguimos encontrar a página que você solicitou</p>
            </div>}
          />
          <Route 
            path='/student/edit/:id' 
            element={<StudentManagerPage/>}
          />
          
          
        </Routes>
        </div>
    </section>
    </div>
    

    <StudentListPage/>
    
    
    </BrowserRouter>

    
  );
}

export default App;
