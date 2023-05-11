import { Route, Routes, BrowserRouter } from 'react-router-dom'
import './App.scss'
import MainPage from './pages/MainPage'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
