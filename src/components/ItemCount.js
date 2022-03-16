import {useState} from 'react'
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const ItemCounter = ({stock, initial, addItem, item}) => { //Contador de productos y botón Agregar al Carrito, con sus propias alerts
    const [cant, setCant] = useState(initial=1); 
    
    const increment = () => { //Incrementar el  número de productos
        if(cant < stock){
            setCant(cant + 1)
        }      
    }
    const decrement = () => { //Disminuir el número de productos
        if(cant > 1){
            setCant(cant -1)
        }      
    }
    const showAlert = () => { //Mostrar alerta de que los productos fueron agregados
        Swal.fire({
            title: "¡Producto/s añadido/s correctamente!",
            confirmButtonText: "Siguiente",
            confirmButtonColor: '#03BB85',
            position: 'top-end',
            height: 300,
            width: 400,
            timer: 1500,
    })}
    

    return (
      <section><div className="font-bold text-3xl font-[Poppins] text-gray-800 flex flex-wrap mb-10" ><div className="w-32 border border-indigo-600 rounded flex justify-around mb-3"><button type='text' onClick={decrement} className="text-indigo-600">-</button>
      <p className='mt-1'>{cant}</p>
      <button className="text-indigo-600" onClick={increment}>+</button></div>
      <div><select className='block p-2 text-black text-base ml-4 w-44 border border-indigo-600 rounded'>
            <option>Juego digital</option>
            <option>Juego físico</option>
            </select></div>
      <button className="pt-2 pb-2 bg-indigo-500 text-white w-full mt-2 rounded-sm font-semibold text-xl flex 
                      justify-center items-baseline  hover:bg-indigo-600" onClick={ () => {addItem(item, cant); showAlert()} }>Agregar al Carrito<FontAwesomeIcon icon={faShoppingCart} className="w-6 ml-2" /></button></div>
      </section>
    )
}

export default ItemCounter; 
