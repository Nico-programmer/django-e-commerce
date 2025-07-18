import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {
        'Content-Type': 'application/json',
    }
})

// Agregamos el token automaticamente
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access')

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

api.interceptors.response.use(
    (response) => response,

    // Creamos una función asyncrona
    async (error) => {
        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            try {
                const newToken = await refreshAccessToken()

                axios.defaults.headers.common.Authorization = `Bearer ${newToken}`
                originalRequest.headers.Authorization = `Bearer ${newToken}`

                return api(originalRequest)
            } catch (refreshError) {
                console.error("No se pudo refrescar el token:", refreshError)

                localStorage.removeItem('access')
                localStorage.removeItem('refresh')

                window.location.href = '/ingresar-cuenta'

                return Promise.reject(refreshError)
            }
        }

        return Promise.reject(error)
    }
)


export default api