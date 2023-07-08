import Header from "./headerComponent";
import styles from '../css/loginRegister.module.css'
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import {API_URL} from "../config";

export default function RegisterPage() {
    const navigate = useNavigate()
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const [error, setError] = useState("");
    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
    })
    const detectarCambio = (event) => {
        const {name, value} = event.target
        setData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const registerUser = async (e) => {
        e.preventDefault()
        try {
            setButtonDisabled(true)
            const url = `${API_URL}/register`;
            const response = await axios.post(url, {
                ...data,
                username: data.username.toLowerCase(),
                email: data.email.toLowerCase()
            })
            console.log('Respuesta:', response)
            navigate('/login')
        } catch (error) {
            setButtonDisabled(false)
            console.log('Error:', error)
            setError(error.response.data.message)
        }
    }

    return (
        <main>
            <Header/>
            <div className={styles.loginContainer}>
                <h1>REGISTRO</h1>
                <form className={styles.loginForm} onSubmit={registerUser}>
                    <label>NOMBRE DE USUARIO</label>
                    <input type='text' name='username' value={data.username} onChange={detectarCambio}/>
                    <label>CORREO ELECTRÓNICO</label>
                    <input type='text' name='email' value={data.email} onChange={detectarCambio}/>
                    <label>CONTRASEÑA</label>
                    <input type='password' name='password' value={data.password} onChange={detectarCambio}/>
                    {error && <div className={styles.errorMessage}>{error}</div>}
                    <button type='submit' disabled={isButtonDisabled}>Registrarse</button>
                    <Link to='/login'>Iniciar sesión</Link>
                </form>
            </div>
        </main>
    )
}