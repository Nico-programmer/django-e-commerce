import { Link } from 'react-router-dom'
import { LogoutButton } from '../labels/Labels'
import { useEffect, useState } from 'react'
import { getUser } from '../../api/user.config'
import { jwtDecode } from 'jwt-decode'
import viteLogo from '/vite.svg'
import UserImage from '/perfil.png'
// Icono
import { FaDoorClosed } from "react-icons/fa6"

function Navigate() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const access = localStorage.getItem('access')
    if (!access) return;

    try {
      const decoded = jwtDecode(access)
      const userId = decoded.user_id

      async function loadUser() {
        try {
          const res = await getUser(userId)
          setUser(res.data)
        } catch (err) {
          console.error('Error al cargar el usuario:', err)
        }
      }

      loadUser();
    } catch (err) {
      console.warn('Token inválido o expirado')
    }
  }, []);

  return (
    <nav className="bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700 shadow-sm">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center p-4">
        {/* Logo e Inicio */}
        <Link to="/" className="flex items-center space-x-3">
          <img src={viteLogo} alt="Logo" className="h-8" />
          <span className="text-2xl font-bold dark:text-white">Ecommerce</span>
        </Link>

        {/* Navegación */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white">
            Inicio
          </Link>
          <Link to="/productos" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white">
            Productos
          </Link>
          {/* Agrega más enlaces si deseas */}
        </div>

        {/* Usuario / Logout */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-800 dark:text-white">
                  {user.full_name}
                </p>
              </div>
              <img
                className="w-10 h-10 rounded-full object-cover border-2 border-gray-300 cursor-pointer"
                src={ UserImage }
                alt="Avatar"
              />
              <LogoutButton />
            </>
          ) : (
            <Link to="/ingresar-cuenta" className="cursor-pointer text-sm font-medium text-gray-800 dark:text-white">
              <FaDoorClosed size={24} />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigate;