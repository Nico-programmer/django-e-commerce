// Logotipo
import viteLogo from '/vite.svg'
// Importaciones
import { use, useState } from "react"
import {login} from '../../api/auth'
import { useNavigate } from "react-router-dom"
// Iconos
import { MdAlternateEmail } from 'react-icons/md'
import { FaFingerprint, FaRegEye, FaRegEyeSlash, FaGoogle } from 'react-icons/fa'
import { BsApple } from 'react-icons/bs'
import { FaXTwitter } from 'react-icons/fa6'
// Mensajes de alerta
import Swal from 'sweetalert2'

// Creamos nuestro componente
function LoginForm({ onLoginSuccess }) {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const togglePasswordView = () => setShowPassword(!showPassword);

    // Funcion para validar el registro
    const handleSubmit = async (e) => {
        // Evitamos recargar la pagina
        e.preventDefault()
        try {
            // Realizamos la petición
            await login(email, password)
            // Mensaje de exito
            Swal.fire({
                title: '¡Bienvenido!',
                text: 'Inicio de sesión exitoso',
                icon: 'success',
                confirmButtonText: 'Entrar',
            })
            
            // Iniciamos sesión
            onLoginSuccess()
            // Redireccionar al Home
            navigate('/')
        } catch (error) {
            console.error("Error real de login:", error.response?.data || error.message)
            
            // Mensaje de error
            Swal.fire({
                title: 'Error',
                text: '¡Credenciales invalidas!',
                icon: 'error',
                confirmButtonText: 'Intentar de nuevo'
            })
        }
    }

    // Codigo HTML
    return (
        <div className="w-full h-screen flex items-center justify-center text-white">
            <div className="w-[90%] max-w-sm md:max-w-md lg:max-w-md p-5 bg-gray-900 flex-col flex items-center gap-3 rounded-xl shadow-slate-500 shadow-lg">
                <img src={viteLogo} alt="logo" className="w-12 md:w-14" />
                <h1 className="text-lg md:text-xl font-semibold">Bienvenido otra vez</h1>
                <p className="text-xs md:text-sm text-gray-500 text-center">
                    ¿No tienes una cuenta? <span className="text-white">Crear cuenta</span>
                </p>

                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
                    {error && (
                        <p className="text-red-500 text-sm text-center -mt-2">{error}</p>
                    )}

                    <div className="w-full flex items-center gap-2 bg-gray-800 p-2 rounded-xl">
                        <MdAlternateEmail />
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            className="bg-transparent border-0 w-full outline-none text-sm md:text-base"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="w-full flex items-center gap-2 bg-gray-800 p-2 rounded-xl relative">
                        <FaFingerprint />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Contraseña"
                            className="bg-transparent border-0 w-full outline-none text-sm md:text-base"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {showPassword ? (
                        <FaRegEyeSlash
                            className="absolute right-5 cursor-pointer"
                            onClick={togglePasswordView}
                        />
                        ) : (
                        <FaRegEye
                            className="absolute right-5 cursor-pointer"
                            onClick={togglePasswordView}
                        />
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full p-2 bg-blue-500 rounded-xl mt-3 hover:bg-blue-600 text-sm md:text-base"
                    >
                        Ingresar
                    </button>
                </form>

                <div className="relative w-full flex items-center justify-center py-3">
                    <div className="w-2/5 h-[2px] bg-gray-800"></div>
                    <h3 className="font-lora text-xs md:text-sm px-4 text-gray-500">O</h3>
                    <div className="w-2/5 h-[2px] bg-gray-800"></div>
                </div>

                <div className="w-full flex items-center justify-evenly md:justify-between gap-2">
                    <div className="p-2 md:px-6 lg:px-10 bg-slate-700 cursor-pointer rounded-xl hover:bg-slate-800">
                        <BsApple className="text-lg md:text-xl" />
                    </div>
                    <div className="p-2 md:px-6 lg:px-10 bg-slate-700 cursor-pointer rounded-xl hover:bg-slate-800">
                        <FaGoogle className="text-lg md:text-xl" />
                    </div>
                    <div className="p-2 md:px-6 lg:px-10 bg-slate-700 cursor-pointer rounded-xl hover:bg-slate-800">
                        <FaXTwitter className="text-lg md:text-xl" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm