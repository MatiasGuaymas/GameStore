import {useContext} from 'react'
import { CartContext } from './CartContext';

const CartWidget = () => { //Widget que cuenta los productos que hay en el carrito
    const { items } = useContext(CartContext)

    let itemsCart = 0 //Definir que no haya productos
    items.map((item) => { //En caso de agregar productos, sumarlos al Widget y mostrar su cantidad
        itemsCart = itemsCart + item.cant
    })

    const widgetEmpty = () => { //Cuando no haya productos, mostrar un Widget vacío
        if (itemsCart == 0) {
            return (
                <>
                    <button className='relative py-3 px-4 rounded text-4xl ml-2'>
                    <ion-icon name="cart-outline"></ion-icon>
                    </button>
                </>
            )
        } else {
            return ( //Cuando haya productos, verlos en la UI por medio de un Widget 
                <>
                    <button className='relative py-3 px-4 rounded text-4xl ml-2'>
                    <ion-icon name="cart-outline"></ion-icon>
                    <span className='absolute left-9 top-1 bg-red-500 text-red-200 py-1 px-2 text-xs rounded-full ml-1'>
                    {itemsCart}
                    </span>
                    </button>
                </>
            )
        }
    }
    
    return (
        widgetEmpty()
    )
    }

export default CartWidget; 


