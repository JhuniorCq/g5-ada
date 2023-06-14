import Header from "./headerComponent"
import styles from '../css/store.module.css'
import {Link} from "react-router-dom"
import {useState} from "react";

import heroMain from '../img/hero/heroMain.jpg'
import hero1 from '../img/hero/hero1.jpg'
import hero2 from '../img/hero/hero2.jpg'
import hero3 from '../img/hero/hero3.jpg'
import hero4 from '../img/hero/hero4.jpg'

export default function StorePage() {
    const [query, setQuery] = useState("")

    const updateQuery = (event) => {
        setQuery(event.target.value)
    }

    const searchQuery = async (e) => {
        e.preventDefault()
        console.log('Search: ', query)
    }

    return (
        <main>
            <Header/>
            <div className={styles.storeContainer}>
                <div className={styles.storeColumn}>
                    <nav className={styles.navigation}>
                        <ul>
                            <li><Link to='/'>Tienda</Link></li>
                            <li><Link to='/'>Nuevo</Link></li>
                            <li><Link to='/'>Categorías</Link></li>
                            <li><Link to='/'>Noticias</Link></li>
                        </ul>
                        <form className={styles.searchBar} onSubmit={searchQuery}>
                            <input type='text' placeholder='Buscar...' name='query' onChange={updateQuery}
                                   value={query}/>
                            <button type='submit'>Buscar</button>
                        </form>
                    </nav>

                    <div className={styles.storeHero}>
                        <h4>DESTACADOS Y RECOMENDADOS</h4>
                        <div className={styles.heroMainBanner}>
                            <img alt='hero-main' src={heroMain}></img>
                            <div className={styles.heroContent}>
                                <h2>Red Dead Redemption 2</h2>
                                <div>
                                    <img alt='hero1' src={hero1}></img>
                                    <img alt='hero2' src={hero2}></img>
                                    <img alt='hero3' src={hero3}></img>
                                    <img alt='hero4' src={hero4}></img>
                                </div>
                                <h3>Ya disponible</h3>
                                <p>S/. 199.00</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}