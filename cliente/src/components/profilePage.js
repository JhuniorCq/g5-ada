import Header from "./headerComponent"
import styles from "../css/profile.module.css"
import defaultIMG from '../img/profile.jpg'
import {useEffect, useState} from "react"
import {API_URL} from "../config"
import {useLocation, useNavigate} from "react-router-dom"
import axios from "axios"

export default function ProfilePage() {
    const location = useLocation()
    const navigation = useNavigate()
    const searchParams = new URLSearchParams(location.search)
    const username = searchParams.get('username')
    const [userData, setUserData] = useState({})

    useEffect(() => {
        const receiveUserData = async () => {
            try {
                const url = `${API_URL}/getUserByName?username=${username}`
                const response = await axios.get(url)
                setUserData(response.data)
            } catch (error) {
                if (error.response.status === 400) {
                    navigation('/')
                }
                console.error('Error al obtener los datos del usuario:', error)
            }
        }

        receiveUserData().then(() => {
            console.log('Datos de usuario recibidos...')
        })
    }, [username, navigation])

    return (
        <main>
            <Header/>
            <div className={styles.profileContainer}>
                <div className={styles.profileColumns}>
                    <div className={styles.profileHeader}>
                        <img alt='profileIMG' src={userData.avatar || defaultIMG}></img>
                        <div>
                            <h2>{userData.displayname || userData.username}</h2>
                            <p>{userData.description || 'No hay una descripción.'}</p>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    )
}