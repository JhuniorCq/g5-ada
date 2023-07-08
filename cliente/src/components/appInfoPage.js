import Header from "./headerComponent"
import styles from "../css/appInfo.module.css"
import {useEffect, useState} from "react"
import {API_URL} from "../config"
import {useLocation, useNavigate} from "react-router-dom"
import axios from "axios"
import {addItem, saveCart} from "./dataStructures/cartStructure"
import wishListClass from "./dataStructures/wishListStructure"

export default function AppInfoPage() {
    const location = useLocation()
    const navigation = useNavigate()
    const wishList = new wishListClass()
    const searchParams = new URLSearchParams(location.search)
    const appid = searchParams.get('appid')
    const [appData, setAppData] = useState({})
    const [images, setImages] = useState([])

    useEffect(() => {
        const receiveAppData = async () => {
            try {
                const url = `${API_URL}/getAppByID?appid=${appid}`
                const response = await axios.get(url)
                setAppData(response.data)
                setImages(response.data.screenshots)
                console.log(response.data.screenshots)
            } catch (error) {
                if (error.response.status === 400) {
                    navigation('/')
                }
                console.error('Error al obtener los datos de la aplicación:', error)
            }
        }

        receiveAppData().then(() => {
            console.log('Datos de la aplicación recibidos...')
        })
    }, [appid, navigation])

    const addToCart = () => {
        addItem({
            itemID: appData.steam_appid,
            itemIMG: appData.header_image,
            itemName: appData.name,
            itemReleaseDate: appData.release_date,
            itemPriceData: appData.price_overview,
            itemScreenshots: appData.screenshots,
            itemAbout: appData.about_the_game,
            itemRequirements: appData.pc_requirements,
            itemShortDescription: appData.short_description
        })
        saveCart()
    }

    const addToWish = () => {
        wishList.agregarElemento({
            itemID: appData.steam_appid,
            itemIMG: appData.header_image,
            itemName: appData.name,
            itemReleaseDate: appData.release_date,
            itemPriceData: appData.price_overview
        })
    }

    return (
        <main>
            <Header/>
            <div className={styles.appContainer} style={{backgroundImage: `url(${appData.background})`}}>
                <div className={styles.appColumn}>
                    <div className={styles.appHeader}>
                        <h1>{appData.name}</h1>
                        <div className={styles.appHeaderInfo}>
                            <div className={styles.appHeaderIMG}>
                                <img src={images?.[0]?.path_full} alt='thumbnail'/>
                            </div>
                            <div className={styles.appHeaderText}>
                                <img src={appData.header_image} alt='header'/>
                                <p>{appData.short_description}</p>
                                <button className={styles.wishList} onClick={addToWish}>Añadir a Lista de Deseados
                                </button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className={styles.buySection}>
                            <h2>Comprar {appData.name}</h2>
                            <div>
                                <p>{appData.price_overview ? appData.price_overview.final_formatted : 'No Disponible'}</p>
                                {appData.price_overview && <button onClick={addToCart}>Añadir al carro</button>}
                            </div>
                        </div>

                        <div className={styles.aboutGame}>
                            <h2>Acerda de este juego:</h2>
                            <p dangerouslySetInnerHTML={{__html: appData.about_the_game}}></p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}