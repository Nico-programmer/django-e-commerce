import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { getUser } from '../api/user.config';
import Navigate from './navigation/Navigate'; // Asegúrate que esté bien

function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const access = localStorage.getItem('access');
    if (!access) return;

    try {
      const decoded = jwtDecode(access);
      const userId = decoded.user_id;

      async function loadUser() {
        try {
          const res = await getUser(userId);
          setUser(res.data);
        } catch (err) {
          console.error('Error al cargar el usuario:', err);
        }
      }

      loadUser();
    } catch (err) {
      console.warn('Token inválido o expirado');
    }
  }, []);

  return (
    <>
      <Navigate /> {/* Tu componente de navegación personalizado */}

      <h1>Hola Usuario</h1>

      {user ? (
        <p>Correo: {user.email}</p>
      ) : (
        <p>No se pudo cargar tu información.</p>
      )}
    </>
  );
}

export default Home;