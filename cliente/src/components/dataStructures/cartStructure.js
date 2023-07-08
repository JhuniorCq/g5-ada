const getCart = () => {
    const carritoString = localStorage.getItem('carrito')
    return JSON.parse(carritoString) || []
}

const carrito = getCart()

const saveCart = () => {
    const stringCarrito = JSON.stringify(carrito)
    localStorage.setItem('carrito', stringCarrito)
}

const addItem = (elemento) => {
    const itemExistente = carrito.find((item) => item.itemID === elemento.itemID)
    if (!itemExistente) {
        carrito.push(elemento)
    }
}

const deleteItemById = (itemID) => {
    const index = carrito.findIndex((item) => item.itemID === itemID);
    if (index !== -1) {
        carrito.splice(index, 1);
        saveCart()
    }
};

const clearCart = () => {
    carrito.splice(0, carrito.length);
    saveCart();
};

export {getCart, saveCart, addItem, deleteItemById, clearCart}
