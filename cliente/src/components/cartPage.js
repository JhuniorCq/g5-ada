import React, {useEffect, useState} from "react"
import Header from "./headerComponent"
import styles from "../css/cart.module.css"
import {getCart, deleteItemById, clearCart} from "./dataStructures/cartStructure"
import {API_URL} from "../config"
import axios from "axios"
import {useNavigate} from "react-router-dom";
import {clear} from "@testing-library/user-event/dist/clear";

export default function CartPage() {
    const user = JSON.parse(localStorage.getItem('user'))
    const navigation = useNavigate()
    const [carrito, setCarrito] = useState(getCart())
    const [price, setPrice] = useState('0')
    const [isButtonDisabled, setButtonDisabled] = useState(false)
    const [appsData, setAppsData] = useState([])
    const [error, setError] = useState("")

    useEffect(() => {
        const totalPrice = carrito.reduce((total, item) => total + item.itemPriceData.final, 0)
        setPrice((totalPrice / 100).toFixed(2))

        const newAppsData = carrito.map((item) => {
            return {
                steam_appid: item.itemID,
                header_image: item.itemIMG,
                name: item.itemName,
                release_date: item.itemReleaseDate,
                price_overview: item.itemPriceData,
                screenshots: item.itemScreenshots,
                about_the_game: item.itemAbout,
                short_description: item.itemShortDescription,
                pc_requirements: item.itemRequirements,
            }
        })

        setAppsData(newAppsData)
    }, [carrito])

    const handleDeleteItem = (itemID) => {
        deleteItemById(itemID)
        const updatedCart = getCart()
        const newPrice = updatedCart.reduce((total, item) => total + item.itemPriceData.final, 0)
        setCarrito(updatedCart)
        setPrice(newPrice)
    }

    const processPurchase = async (e) => {
        e.preventDefault()
        try {
            setButtonDisabled(true)
            const url = `${API_URL}/processPurchase`
            const response = await axios.post(url, {
                username: user.username,
                apps: appsData
            })
            console.log('Respuesta:', response)
            clearCart()
            navigation('/gameLibrary')
        } catch (error) {
            setButtonDisabled(false)
            console.log('Error:', error)
            setError(error.response.data.message)
        }
        console.log('Comprando')
    }

    return (
        <div>
            <Header/>
            <div className={styles.cartContainer}>
                <div className={styles.cartColumn}>
                    <h1>Tu Carrito de Compras</h1>
                    {carrito.length === 0 ? (
                        <div className={styles.cartItem}>
                            <h4>No hay elementos en el carrito...</h4>
                        </div>
                    ) : (
                        carrito.map((item) => (
                            <div key={item.itemID} className={styles.cartItem}>
                                <div className={styles.leftData}>
                                    <img alt="img" src={item.itemIMG}/>
                                    <h4>{item.itemName}</h4>
                                </div>
                                <div className={styles.rightData}>
                                    <p>{item.itemPriceData.final_formatted}</p>
                                    <button onClick={() => handleDeleteItem(item.itemID)}>
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))
                    )}

                    {carrito.length === 0 ? (
                        <p></p>
                    ) : (
                        <div className={styles.buySection}>
                            <div>
                                <p>Total estimado:</p>
                                <p>S/. {price}</p>
                            </div>
                            {error && <div className={styles.errorMessage}>{error}</div>}
                            <button onClick={processPurchase} disabled={isButtonDisabled}>Comprar</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
