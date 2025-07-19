import { useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom'
// Iconos
import { FaDoorOpen } from "react-icons/fa6"

export function LogoutButton() {
    const  navigate = useNavigate()

    const handleLogout = () => {
        // Eliminamos el token
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')

        // Redirige al login
        navigate('/ingresar-cuenta')
    }

    return (
        <button onClick={handleLogout} className="cursor-pointer text-sm font-medium text-gray-800 dark:text-white">
            <FaDoorOpen size={24} />
        </button>
    )
}