import { useState } from 'react'
import './App.css'
// Importamos las rutas
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
// Importmoas los compoentne
import LoginForm from './components/auth/LoginForm'
import Home from './components/Home'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('access'))

  // Se ejecuta la función cada inicio de sesión
  const handleLoginSuccess = () => {
    setIsLoggedIn(true)
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        {/* Sessiones */}
        <Route path='/ingresar-cuenta' element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
