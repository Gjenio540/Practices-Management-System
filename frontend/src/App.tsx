import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.scss';
import Header from './components/Header';
import MainPage from './pages/MainPage';
import SignInPage from './pages/SignInPage';
import MyPage from './pages/MyPage';
import PracticesPage from './pages/PracticesPage';
import DatailsPage from './pages/DetailsPage';
import StudentsPage from './pages/StudentsPage';
import AddStudentsPage from './pages/AddStudentsPage';
import EditStudentDataPage from './pages/EditStudentDataPage';
import EditPracticeDataPage from './pages/EditPracticeDataPage';
import EditStatusPage from './pages/EditStatusPage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import AddPracticePage from './pages/AddPracticePage';

const App = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path={"/"} element={<MainPage/>}/>
        <Route path={"/logowanie"} element={<SignInPage/>}/>
        <Route path={"/studenci"} element={<StudentsPage/>}/>
        <Route path={"/studenci/dane"} element={<EditStudentDataPage/>}/>
        <Route path={"/studenci/dodaj"} element={<AddStudentsPage/>}/>
        <Route path={"/studenci/praktyka"} element={<AddPracticePage/>}/>
        <Route path={"/praktyki"} element={<PracticesPage/>}/>
        <Route path={"/praktyki/:id"} element={<DatailsPage/>}/>
        <Route path={"/praktyki/me"} element={<MyPage/>}/>
        <Route path={"/praktyki/dane"} element={<EditPracticeDataPage/>}/>
        <Route path={"/praktyki/status"} element={<EditStatusPage/>}/>
        <Route path={"/password"} element={<ChangePasswordPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App
