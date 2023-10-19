import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.scss';
import MainPage from './pages/MainPage';
import SignInPage from './pages/SignInPage';
import StudentPage from './pages/StudentPage';
import PracticesPage from './pages/PracticesPage';
import DatailsPage from './pages/DetailsPage';
import Header from './components/Header';

const App = () => {
  const url = import.meta.env.BASE_URL
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path={url+'/'} element={<MainPage/>}/>
        <Route path={url+'/logowanie'} element={<SignInPage/>}/>
        <Route path={url+'/praktyki'} element={<PracticesPage/>}/>
        <Route path={url+'/praktyki/:id'} element={<DatailsPage/>}/>
        <Route path={url+'/praktyki/me'} element={<StudentPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App
