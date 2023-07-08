import Header from "./headerComponent";
import styles from '../css/community.module.css'
import {useEffect, useState} from "react";
import {API_URL} from "../config";
import axios from "axios";
import defaultIMG from '../img/profile.jpg'
import {Link} from "react-router-dom";

export default function CommunityPage() {
    const [usernameQuery, setUsernameQuery] = useState('');
    const [users, setUsers] = useState([])

    useEffect(() => {
        const receiveUsers = async () => {
            try {
                const url = `${API_URL}/searchUsers?username=${usernameQuery}`
                const response = await axios.get(url)
                setUsers(response.data)
            } catch (error) {
                console.error('Error al obtener los datos del usuario:', error)
            }
        }

        if (usernameQuery !== '' && usernameQuery.length >= 5) {
            receiveUsers().then(() => {
                console.log('Datos de usuarios recibidos...')
            })
        }
    }, [usernameQuery])

    const handleInputChange = (event) => {
        setUsernameQuery(event.target.value);
    }

    return (
        <main>
            <Header/>
            <div className={styles.communityContainer}>
                <div className={styles.communityColumn}>
                    <div className={styles.navSection}>
                        <h2>Buscar perfiles</h2>
                        <h3>Buscar en la comunidad por nombre de usuario</h3>
                        <input name='username' value={usernameQuery} onChange={handleInputChange}/>
                    </div>
                    <div className={styles.resultSection}>
                        {usernameQuery === '' && <p>Ingrese un nombre para buscar...</p>}
                        {usernameQuery.length > 0 && usernameQuery.length < 5 &&
                            <p>Ingrese al menos 5 caracteres...</p>}
                        {usernameQuery.length >= 5 && (
                            <>
                                {users.map((user) => (
                                    <div key={user.username} className={styles.resultItem}>
                                        <div>
                                            <img src={user.avatar || defaultIMG} alt='avatar'/>
                                            <h2>{user.displayname || user.username}</h2>
                                        </div>
                                        <Link to={`/profile?username=${user.username}`} className={styles.seeProfile}>Ver Perfil</Link>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </main>
    )
}