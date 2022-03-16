import React, { createContext, useState } from 'react';

export const CartContext = createContext([])

export const CartProvider = ({ children }) => { //Contexto usado para el funcionamiento correcto del Carrito
    const [items, setItems] = useState([])

    const isInCart = (id) => { //Ver si esta en el carrito
        const find = items.find(item => item.id === id)
        return find
    };

    const addItem = (item, cant) => { //Agregar Item
        isInCart(item.id)
            ?
            setItems(items.map((prod) => {
                if (prod.id === item.id) {
                    prod.cant += cant
                }
                return prod
            }))
            :
            setItems([...items, { id: item.id, title: item.title, price: item.price, pictureURL:  item.pictureURL, cant: cant }])
    };

    const removeItem = (id) => { //Remover Item
        setItems(items.filter(item => item.id !== id))
    }

    const clearItems = () => { //Vaciar Carrito
        setItems([]);
        //showAlertCart()
    }

    const calcTotalPerItem = (id) => { //Calcular el precio total de un Producto
        let index = items.map(item => item.id).indexOf(id);
        return items[index].price * items[index].cant
    }
    
    const calcTotal = () => { //Calcular precio total de todos los Productos
        let totalPerItem = items.map(item => calcTotalPerItem(item.id));
        if (totalPerItem.length > 0) return totalPerItem.reduce((previousValue, currentValue) => previousValue + currentValue)
    }

    

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, clearItems,  calcTotalPerItem, calcTotal }}>
            {children}
        </CartContext.Provider>
    );


}