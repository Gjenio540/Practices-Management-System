import { Route, Routes, BrowserRouter } from 'react-router-dom'
import './App.scss'
import MainPage from './pages/MainPage'
import SignInPage from './pages/SignInPage'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='logowanie' element={<SignInPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
