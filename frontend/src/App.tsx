import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.scss';
import MainPage from './pages/MainPage';
import SignInPage from './pages/SignInPage';
import StudentPage from './pages/StudentPage';
import PracticesPage from './pages/PracticesPage';
import DatailsPage from './pages/DetailsPage';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/logowanie' element={<SignInPage/>}/>
        <Route path='/praktyki' element={<PracticesPage/>}/>
        <Route path='/praktyki/:id' element={<DatailsPage/>}/>
        <Route path='/praktyki/me' element={<StudentPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App
