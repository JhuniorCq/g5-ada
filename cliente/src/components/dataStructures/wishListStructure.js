const getWishList = () => {
    const wishString = localStorage.getItem('lista');
    return JSON.parse(wishString) || [];
};

class Nodo {
    constructor(elemento) {
        this.elemento = elemento;
        this.siguiente = null;
    }
}

class wishListClass {
    constructor() {
        this.cabeza = null;
        const wishList = getWishList();
        wishList.forEach((item) => {
            this.agregarElemento(item);
        });
    }

    agregarElemento(elemento) {
        const itemID = elemento.itemID;

        // Verificar si el elemento ya ha sido agregado
        const elementoExistente = this.buscarElemento(itemID);
        if (elementoExistente) {
            return; // Elemento duplicado, salir del método
        }

        const nuevoNodo = new Nodo(elemento);

        if (!this.cabeza || itemID <= this.cabeza.elemento.itemID) {
            nuevoNodo.siguiente = this.cabeza;
            this.cabeza = nuevoNodo;
        } else {
            let nodoActual = this.cabeza;

            while (nodoActual.siguiente && itemID > nodoActual.siguiente.elemento.itemID) {
                nodoActual = nodoActual.siguiente;
            }

            nuevoNodo.siguiente = nodoActual.siguiente;
            nodoActual.siguiente = nuevoNodo;
        }

        this.guardarLista();
    }

    buscarElemento(itemID) {
        let inicio = 0;
        let fin = this.size() - 1;

        while (inicio <= fin) {
            const medio = Math.floor((inicio + fin) / 2);
            const nodoMedio = this.obtenerNodo(medio);

            if (nodoMedio.elemento.itemID === itemID) {
                return nodoMedio.elemento;
            } else if (nodoMedio.elemento.itemID < itemID) {
                inicio = medio + 1;
            } else {
                fin = medio - 1;
            }
        }

        return null;
    }

    size() {
        let count = 0;
        let nodoActual = this.cabeza;

        while (nodoActual) {
            count++;
            nodoActual = nodoActual.siguiente;
        }

        return count;
    }

    obtenerNodo(indice) {
        if (indice < 0 || indice >= this.size()) {
            return null;
        }

        let count = 0;
        let nodoActual = this.cabeza;

        while (count < indice) {
            count++;
            nodoActual = nodoActual.siguiente;
        }

        return nodoActual;
    }

    eliminarElemento(itemID) {
        if (!this.cabeza) {
            return;
        }

        if (this.cabeza.elemento.itemID === itemID) {
            this.cabeza = this.cabeza.siguiente;
            this.guardarLista();
            return;
        }

        let nodoActual = this.cabeza;
        let nodoAnterior = null;

        while (nodoActual && nodoActual.elemento.itemID !== itemID) {
            nodoAnterior = nodoActual;
            nodoActual = nodoActual.siguiente;
        }

        if (nodoActual) {
            nodoAnterior.siguiente = nodoActual.siguiente;
            this.guardarLista();
        }
    }

    guardarLista() {
        const lista = this.obtenerLista();
        localStorage.setItem('lista', JSON.stringify(lista));
    }

    obtenerLista() {
        const lista = [];
        let nodoActual = this.cabeza;

        while (nodoActual) {
            lista.push(nodoActual.elemento);
            nodoActual = nodoActual.siguiente;
        }

        return lista;
    }
}

export default wishListClass;
