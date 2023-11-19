import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.scss';
import MainPage from './pages/MainPage';
import SignInPage from './pages/SignInPage';
import StudentPage from './pages/StudentPage';
import PracticesPage from './pages/PracticesPage';
import DatailsPage from './pages/DetailsPage';
import Header from './components/Header';
import AddStudents from './pages/AddStudents';
import EditDataPage from './pages/EditDataPage';
import EditStatusPage from './pages/EditStatusPage';

const App = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path={"/"} element={<MainPage/>}/>
        <Route path={"/logowanie"} element={<SignInPage/>}/>
        <Route path={"/studenci"} element={<AddStudents/>}/>
        <Route path={"/praktyki"} element={<PracticesPage/>}/>
        <Route path={"/praktyki/:id"} element={<DatailsPage/>}/>
        <Route path={"/praktyki/me"} element={<StudentPage/>}/>
        <Route path={"/praktyki/dane"} element={<EditDataPage/>}/>
        <Route path={"/praktyki/status"} element={<EditStatusPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App
