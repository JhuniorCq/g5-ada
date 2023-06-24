import Header from "./headerComponent";
import styles from "../css/search.module.css";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {API_URL} from "../config";

export default function SearchPage() {
    const [searchParams] = useSearchParams();
    const currentQuery = searchParams.get("query");
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${API_URL}/searchApps?query=${currentQuery}&page=${currentPage}`
                );
                setData(response.data.apps);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData().then(() => {
            console.log("Búsqueda realizada...");
        });
    }, [currentQuery, currentPage]);

    const updateQuery = (event) => {
        setQuery(event.target.value);
    };

    const searchQuery = (e) => {
        e.preventDefault();
        navigate(`/search?query=${query}&page=${currentPage}`);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            window.scrollTo({top: 0, behavior: "smooth"});
            navigate(`/search?query=${currentQuery}&page=${currentPage - 1}`);
        }
    };

    const goToNextPage = () => {
        setCurrentPage(currentPage + 1);
        window.scrollTo({top: 0, behavior: "smooth"});
        navigate(`/search?query=${currentQuery}&page=${currentPage + 1}`);
    };

    return (
        <main>
            <Header/>
            <div className={styles.searchContainer}>
                <div className={styles.searchColumn}>
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

                    <div className={styles.searchResults}>
                        {data.map((app) => (
                            <div className={styles.searchItem} key={app.steam_appid.toString()}>
                                <img src={app.header_image.toString()} alt='img'></img>
                                <div className={styles.searchItemInfo}>
                                    <p>{app.name}</p>
                                    <p>{app.release_date.date}</p>
                                    <p>A</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div>
                        <button onClick={goToPreviousPage}>Anterior</button>
                        <button onClick={goToNextPage}>Siguiente</button>
                    </div>
                </div>
            </div>
        </main>
    )
}