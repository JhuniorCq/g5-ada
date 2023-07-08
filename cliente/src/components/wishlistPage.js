import Header from "./headerComponent";
import styles from '../css/wish.module.css';
import defaultIMG from '../img/profile.jpg';
import React, {useState} from "react";
import {Link} from "react-router-dom";
import wishListClass from "./dataStructures/wishListStructure";

export default function WishPage() {
    const user = JSON.parse(localStorage.getItem('user'));
    const wishListStructure = new wishListClass();
    const [wishList, setWishList] = useState(wishListStructure.obtenerLista());
    const [selectedFilter, setSelectedFilter] = useState('preferencia');
    const [searchInput, setSearchInput] = useState('');

    const handleOptionChange = (e) => {
        setSelectedFilter(e.target.value);
    };

    const handleDeleteItem = (itemID) => {
        wishListStructure.eliminarElemento(itemID);
        setWishList(wishListStructure.obtenerLista());
    };

    const filteredList = wishList.filter((item) =>
        item.itemName.toLowerCase().includes(searchInput.toLowerCase())
    );

    const compareByName = (a, b) => {
        const nameA = a.itemName.toLowerCase();
        const nameB = b.itemName.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    };

    const compareByDate = (a, b) => {
        const dateA = new Date(a.itemReleaseDate.date);
        const dateB = new Date(b.itemReleaseDate.date);
        return dateA - dateB;
    };

    const compareByPrice = (a, b) => {
        const priceA = a.itemPriceData?.final;
        const priceB = b.itemPriceData?.final;

        if (priceA === undefined && priceB === undefined) {
            return 0;
        }

        if (priceA === undefined) {
            return 1;
        }

        if (priceB === undefined) {
            return -1;
        }

        return priceA - priceB;
    };

    let sortedList = [...filteredList];

    const quicksort = (arr, compareFn) => {
        if (arr.length <= 1) {
            return arr;
        }

        const pivotIndex = Math.floor(arr.length / 2);
        const pivot = arr[pivotIndex];
        const left = [];
        const right = [];

        for (let i = 0; i < arr.length; i++) {
            if (i === pivotIndex) continue;
            if (compareFn(arr[i], pivot) < 0) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }

        return [...quicksort(left, compareFn), pivot, ...quicksort(right, compareFn)];
    };

    if (selectedFilter === 'nombre') {
        sortedList = quicksort(sortedList, compareByName);
    } else if (selectedFilter === 'precio') {
        sortedList = quicksort(sortedList, compareByPrice);
    } else if (selectedFilter === 'fecha') {
        sortedList = quicksort(sortedList, compareByDate);
    }

    return (
        <div>
            <Header/>
            <div className={styles.wishContainer}>
                <div className={styles.wishColumn}>
                    <div className={styles.wishHeader}>
                        <img src={user.avatar || defaultIMG} alt="avatar"/>
                        <h1>Lista de deseados de {user.displayname || user.username}</h1>
                    </div>
                    <div className={styles.wishNavigation}>
                        <input
                            placeholder="Buscar por nombre"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        <select value={selectedFilter} onChange={handleOptionChange}>
                            <option value="preferencia">Ordenar por: Defecto</option>
                            <option value="nombre">Ordenar por: Nombre</option>
                            <option value="precio">Ordenar por: Precio</option>
                            <option value="fecha">Ordenar por: Fecha de Lanzamiento</option>
                        </select>
                    </div>
                    <div>
                        {sortedList.length === 0 ? (
                            <div className={styles.wishItem}>
                                <h4>No hay elementos en tu Lista de Deseados...</h4>
                            </div>
                        ) : (
                            sortedList.map((item) => (
                                <div key={item.itemID} className={styles.wishItem}>
                                    <div className={styles.wishItemInfo}>
                                        <img src={item.itemIMG} alt="img"/>
                                        <div>
                                            <h2>{item.itemName}</h2>
                                            <div>
                                                <p>Fecha de Lanzamiento: {item.itemReleaseDate.date}</p>
                                                <p>Precio: {item.itemPriceData?.final_formatted ?? 'Proximamente...'}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.itemButtons}>
                                        <Link to={`/appInfo?appid=${item.itemID}`}>Ver más</Link>
                                        <button onClick={() => handleDeleteItem(item.itemID)}>
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
