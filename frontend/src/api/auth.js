import api from './config'
// Redirección
import { useNavigate } from 'react-router-dom'

// Creamos una función asincrona
export const login = async (email, password) => {
    try {
        // Realizamos una solicitud a nuestra api
        const response = await api.post('user/api/token/', {
            email,
            password,
        })

        // Obtenemos el token y refrescamos
        localStorage.setItem('access', response.data.access)
        localStorage.setItem('refresh', response.data.refresh)
        return response.data
    } catch (err) {
        throw err
    }
}

// Refrescamos el token
export const refreshAccessToken = async () => {
    const refresh = localStorage.getItem('refresh')
    // Realizamos la petición
    const response = await api.post('user/api/token/refresh/', {refresh})

    // Almacenamos el token
    localStorage.setItem('access', response.data.access)
}

// Cargamos la vista protegida
export const getProtectedData = async () => {
    try {
        // Realizamos la solicitud
        const response = await api.get('user/api/protected/')
        // Devolvemos un valor
        return response.data
    } catch (error) {
        // Validamos el error
        if (error.response?.status === 401) {
            // Intentar refrescar el token
            try {
                await refreshAccessToken()
                // Reintentamos
                const retryResponse = await api.get('user/api/protected/')
                // Devolvemos la respuesta
                return retryResponse.data
            } catch (refreshError) {
                throw new Error('Sesión expirada. Por favor inicia sesión de nuevo!')
            }
        } else {
            throw error
        }
    }
}

// Crear una funcion para cerrar sesión
export const logout = async() => {
    const navigate = useNavigate()

    const handleLogout = () => {
        // Eliminar tokens
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')

        // Redirigimos
        navigate('/ingresar-cuenta')
    }
}