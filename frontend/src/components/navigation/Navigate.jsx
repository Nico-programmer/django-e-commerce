import { logout } from '../../api/auth'
import { Link } from 'react-router-dom'

function Navigate() {
    return (
        <div>
            <h1>Ecommerce</h1>

            <ul>
                <li>Inicio</li>

                <li><Link to="/ingresar-cuenta">Ingresar</Link></li>
                <li>Cerrar sesión</li>
            </ul>
        </div>
    )
}

export default Navigate