import { Link } from 'react-router-dom'
import { LogoutButton } from '../labels/Labels'

function Navigate() {
    return (
        <div>
            <h1>Ecommerce</h1>

            <ul>
                <li>Inicio</li>

                <li><Link to="/ingresar-cuenta">Ingresar</Link></li>
                <li><LogoutButton /></li>
            </ul>
        </div>
    )
}

export default Navigate