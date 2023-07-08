import logo from '../img/logo.png'
import styles from '../css/header.module.css'
import {Link} from "react-router-dom";

export default function Header() {
    const localUser = JSON.parse(localStorage.getItem('user'))

    const logOut = () => {
        localStorage.removeItem('user')
    }

    return (
        <main className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src={logo} alt="logo"></img>
                <ul>
                    <li><Link to='/'>TIENDA</Link></li>
                    <li><Link to='/community'>COMUNIDAD</Link></li>
                    {!localStorage.getItem('user') && <li><Link to='/login'>INICIAR</Link></li>}
                    {localStorage.getItem('user') && <li><Link to={`/gameLibrary`}>BIBLIOTECA</Link></li>}
                    {localStorage.getItem('user') && <li><Link to={`/profile?username=${localUser.username}`}>PERFIL</Link></li>}
                    {localStorage.getItem('user') && <li><Link to={'/'} onClick={logOut}>SALIR</Link></li>}
                </ul>
            </div>
        </main>
    )
}