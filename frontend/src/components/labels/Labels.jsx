import { useNavigate } from "react-router-dom";

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
        <button onClick={handleLogout}>Cerrar sesión</button>
    )
}