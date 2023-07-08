import Header from "./headerComponent";
import styles from '../css/library.module.css';
import gameLibraryClass from "./dataStructures/gameLibraryStructure";
import React, {useEffect, useState} from "react";
import Queue from "./dataStructures/downloadQueue";

export default function LibraryPage() {
    const [apps, setApps] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('preferencia');
    const [searchInput, setSearchInput] = useState('');
    const downloadQueueStructure = new Queue()
    const [progress, setProgress] = useState(0);
    const [downloading, setDownloading] = useState(false);

    useEffect(() => {
        const gameLibraryStructure = new gameLibraryClass();
        gameLibraryStructure.obtenerBibliotecaDeJuegos().then(() => {
            setApps(gameLibraryStructure.obtenerLista());
            console.log('Lista de juegos recibida...');
        });
    }, []);

    const handleOptionChange = (e) => {
        setSelectedFilter(e.target.value);
    };

    const filteredList = apps.filter((item) =>
        item.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    const compareByDate = (a, b) => {
        const dateA = new Date(a.release_date.date);
        const dateB = new Date(b.release_date.date);
        return dateA - dateB;
    };

    const compareByName = (a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    };

    const compareByPrice = (a, b) => {
        return a.price_overview.final - b.price_overview.final;
    };

    const mergeSort = (arr, compareFn) => {
        if (arr.length <= 1) {
            return arr;
        }

        const mid = Math.floor(arr.length / 2);
        const left = arr.slice(0, mid);
        const right = arr.slice(mid);

        const sortedLeft = mergeSort(left, compareFn);
        const sortedRight = mergeSort(right, compareFn);

        return merge(sortedLeft, sortedRight, compareFn);
    };

    const merge = (left, right, compareFn) => {
        let i = 0;
        let j = 0;
        const merged = [];

        while (i < left.length && j < right.length) {
            if (compareFn(left[i], right[j]) <= 0) {
                merged.push(left[i]);
                i++;
            } else {
                merged.push(right[j]);
                j++;
            }
        }

        while (i < left.length) {
            merged.push(left[i]);
            i++;
        }

        while (j < right.length) {
            merged.push(right[j]);
            j++;
        }

        return merged;
    };

    let sortedList = [...filteredList];

    if (selectedFilter === 'nombre') {
        sortedList = mergeSort(sortedList, compareByName);
    } else if (selectedFilter === 'precio') {
        sortedList = mergeSort(sortedList, compareByPrice);
    } else if (selectedFilter === 'fecha') {
        sortedList = mergeSort(sortedList, compareByDate);
    }

    const addToDownloads = (item) => {
        downloadQueueStructure.enqueue(item)
    }

    const startDownload = () => {
        setDownloading(true);
        setProgress(0)

        const interval = setInterval(() => {
            setProgress((prevProgress) => {
                const newProgress = prevProgress + 10;
                if (newProgress === 100) {
                    clearInterval(interval);
                    setDownloading(false);
                    // Eliminar el elemento de la cola al finalizar la descarga
                    downloadQueueStructure.dequeue();
                }
                return newProgress;
            });
        }, 1000);
    };

    return (
        <div>
            <Header/>
            <div className={styles.libraryContainer}>
                <div className={styles.libraryColumn}>
                    <div className={styles.libraryHeader}>
                        <div>
                            <h1>Mi biblioteca</h1>
                        </div>
                        <div>
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
                        {downloadQueueStructure.size() === 0 ? (
                            <div>
                                <h3>No hay descargas pendientes...</h3>
                            </div>
                        ) : (
                            <div className={styles.downloadContainer}>
                                <div className={styles.downloadInfo}>
                                    <p>{downloadQueueStructure.front().name}</p>
                                    <p>{progress}%</p>
                                </div>
                                {downloading ? (
                                    <div className={styles.progressBarContainer}>
                                        <div className={styles.progressBar}>
                                            <div className={styles.progressBarFill}
                                                 style={{width: `${progress}%`}}></div>
                                        </div>
                                    </div>
                                ) : (
                                    <button onClick={startDownload}>Iniciar Descarga</button>
                                )}
                            </div>
                        )}
                    </div>
                    <div>
                        {sortedList.length === 0 ? (
                            <div className={styles.libraryItem}>
                                <h4>No hay elementos en tu Biblioteca...</h4>
                            </div>
                        ) : (
                            sortedList.map((item) => (
                                <div key={item.steam_appid} className={styles.libraryItem}>
                                    <div className={styles.libraryItemInfo}>
                                        <img src={item.header_image} alt="img"/>
                                        <div>
                                            <h2>{item.name}</h2>
                                            <div>
                                                <p>{item.short_description}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.downloadSection}>
                                        <button onClick={() => addToDownloads(item)}>+</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

        </div>
    )
}
