import { use, useState } from "react"
import {login} from '../../api/auth'
import { useNavigate } from "react-router-dom"

// Creamos nuestro componente
function LoginForm({ onLoginSuccess }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    // Funcion para validar el registro
    const handleSubmit = async (e) => {
        // Evitamos recargar la pagina
        e.preventDefault()
        try {
            // Realizamos la petición
            await login(email, password)
            // Mensaje de exito
            alert('Inicio de sesión exitoso!')
            // Iniciamos sesión
            onLoginSuccess()
            // Redireccionar al Home
            navigate('/')
        } catch (error) {
            console.error("Error real de login:", error.response?.data || error.message)
            // Mensaje de error
            setError('Credenciales invalidas!')
        }
    }

    // Codigo HTML
    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2>Iniciar sesión</h2>
                { error && <p>{error}</p> }

                <input type="email" placeholder="Correo electronico" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />

                <button type="submit">Ingresar</button>
            </form>
        </>
    )
}

export default LoginForm