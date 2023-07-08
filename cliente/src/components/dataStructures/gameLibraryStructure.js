import axios from "axios";
import {API_URL} from "../../config";

class Nodo {
    constructor(app) {
        this.app = app;
        this.siguiente = null;
    }
}

class gameLibraryClass {
    constructor() {
        this.cabeza = null;
        this.user = JSON.parse(localStorage.getItem('user'));
        this.username = this.user.username;
    }

    async obtenerBibliotecaDeJuegos() {
        try {
            const url = `${API_URL}/getLibrary?username=${this.username}`;
            const response = await axios.get(url);

            response.data.gameLibrary.map((item) => {
                this.agregarApp(item);
            })
        } catch (error) {
            console.error('Error al obtener la biblioteca de juegos:', error);
        }
    }

    agregarApp(app) {
        const nuevoNodo = new Nodo(app);

        if (!this.cabeza) {
            this.cabeza = nuevoNodo;
        } else {
            let nodoActual = this.cabeza;
            while (nodoActual.siguiente) {
                nodoActual = nodoActual.siguiente;
            }
            nodoActual.siguiente = nuevoNodo;
        }
    }

    obtenerLista() {
        const lista = [];
        let nodoActual = this.cabeza;

        while (nodoActual) {
            lista.push(nodoActual.app);
            nodoActual = nodoActual.siguiente;
        }

        return lista;
    }
}

export default gameLibraryClass