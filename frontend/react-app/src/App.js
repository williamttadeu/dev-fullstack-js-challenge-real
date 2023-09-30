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
            path='/student/edit/:ra' 
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
