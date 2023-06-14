import Header from "./headerComponent";
import styles from '../css/about.module.css'
import {Link} from "react-router-dom";

export default function AboutPage() {
    return (
        <main>
            <Header/>
            <div className={styles.heroContainer}>
                <h1>Accede a miles de juegos al instante</h1>
                <p>Con casi 30 000 juegos, incluyendo títulos AAA, independientes, y mucho más. Disfruta de ofertas
                    exclusivas, actualizaciones de juegos automáticas, y otros beneficios.</p>
                <Link to='/'>Ver la tienda</Link>
            </div>
        </main>
    )
}