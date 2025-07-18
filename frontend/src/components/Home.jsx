// Exportamos funciones
import { useEffect, useState } from 'react'
// Importamos los decoradores JWT
import { jwtDecode } from 'jwt-decode'
import { getUser } from '../api/user.config'

// Importamos un componente
import Navigate from './navigation/Navigate'

function Home({pk}) {

    const [user, setUser] = useState(null)

    useEffect(() => {
        // Cargamos el token de acceso
        const access = localStorage.getItem('access')

        // Validamos si el token es valido
        if (!access) return

        // Creamos un decorador (obtener token y el id)
        const decoded = jwtDecode(access)
        const userId = decoded.user_id

        async function loadUser() {
            try {
                // Realizamos la ppetición
                const res = await getUser(userId)
                // Guardamos los datos del usuario
                setUser(res.data)
            } catch (err) {
                console.error('Error al cargar el usuario: ', err)
            }
        }

        loadUser()
    }, [])

    // Evitamos errores
    if (!user) {
        return <p>Cargando usuario...</p>
    }

    return (
        <>
            <Navigate />
            <h1>Hola Usuario</h1>
            <p>Correo {user.email}</p>
        </>
    )
}

export default Home