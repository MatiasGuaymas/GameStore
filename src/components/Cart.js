import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import { Link } from "react-router-dom";
import { serverTimestamp, doc, collection, setDoc, updateDoc, increment } from 'firebase/firestore';
import db from "../utils/fireBaseConfig";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content'

const Cart = () => { //Carrito con cantidades, precio normal y precio total del producto (según las cantidades solicitadas) y finalmente costo total de la orden. Posee una alerta donde figura el número de orden de la compra. 
    
    const { items, removeItem, clearItems, calcTotalPerItem, calcTotal } = useContext(CartContext) //Traemos los métodos que usaremos

    const createOrder = () => { //Crear orden Firebase
      let order = {
          buyer: {
              email: "buyer@gmail.com",
              name: "Name of the Buyer",
              phone: "221 111 11-11"
          },
          date: serverTimestamp(),
          items: items.map((it) => {
              return { id: it.id, cant: it.cant, price: it.price, title: it.title }
          }),
          total: calcTotal()
      }

      const createOrderFirestore = async () => {
          const newOrderRef = doc(collection(db, "orders"))
          await setDoc(newOrderRef, order);
          return newOrderRef;
      }
      const MySwal = withReactContent(Swal)

      const showCartAlert = (result) => { //Alert en Order
        MySwal.fire({
            html: <div className="font-[Poppins]"><h1 className="text-3xl font-bold">Compra realizada</h1><br></br><div className="text-2xl">Número de compra: <br></br>{result.id}</div></div>,
            icon: "success",
            confirmButtonText: "Siguiente",
            confirmButtonColor: '#03BB85',
    })}

    const errorCart = () => { //Alert si no hay productos
      Swal.fire({
          title: 'No hay productos para comprar',
          icon: "error",
          confirmButtonText: "Siguiente",
          confirmButtonColor: '#03BB85',
  })}

      createOrderFirestore() //Crear orden en Firestore
          .then(result => {
            showCartAlert(result)
              items.map(async (item) => {
                  const itemRef = doc(db, "Products", item.id)
                  await updateDoc(itemRef, {
                      stock: increment(-item.cant)
                  });
              });
              clearItems();
          })
          .catch(errorCart)
  }

    return (
        <div className='container mx-auto mt-10 font-[Poppins]'>
        <div className=' lg:flex shadow-md my-10'>
          <div className='w-full lg:w-3/4 border border-solid p-4 border-slate-200 bg-slate-200 px-10 py-10'>
            <div className='flex justify-between border-b pb-8'>
              <h1 className='font-semibold text-2xl'>Carrito</h1>
              <h2 className='font-semibold text-2xl'>{items.length} Items </h2>
            </div>
            <div className='flex mt-7 mb-5'>
              <h3 className='font-semibold text-black text-s uppercase w-2/5 text-center sm:text-left'>Detalles del Producto</h3>
              <h3 className='font-semibold text-black ml-10 sm:ml-0 text-s uppercase w-1/5 text-center'>Cantidad</h3>
              <h3 className='invisible sm:visible font-semibold  text-black  text-s uppercase w-1/5 text-center'>Precio</h3>
              <h3 className='font-semibold  text-black text-s uppercase w-1/5 text-center'>Total</h3>
            </div>
            {items.length > 0
            ? <span className="hidden"> x </span>
            : <div><p className="text-xl font-bold mt-7 text-center sm:text-left">No hay productos en el carrito 😔</p>
            <Link to='/' className='flex font-semibold text-indigo-600 text-lg mt-8'>
              <svg className='fill-current mr-2 text-indigo-600 w-4' viewBox='0 0 448 512'>
                <path d='M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z' />
              </svg>
              Seguir Comprando
            </Link>
            </div>
            }
            {items.length > 0 &&
              items.map((item) => (
                <div className='flex items-center hover:bg-gray-100 -mx-8 px-6 py-5'>
                  <div className='flex w-2/5'>
                    <div className='w-40 hidden xl:block'>
                      <img className='h-24 ' src={item.pictureURL} alt={item.title} />
                    </div>
                    <div className='flex flex-col sm:ml-4 xl:flex-grow xl:justify-center'>
                      <span className='font-bold text-xl text-center'>{item.title}</span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className='font-semibold hover:text-indigo-600 text-blue-400 text-s mt-5'
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                  <div className='flex justify-center w-1/5 ml-10 sm:ml-0'>
                    <input
                      className='mx-2 border text-center w-8'
                      type='text'
                      value={item.cant}
                      stock={item.stock}
                      readOnly
                    />
                  </div>
                  <span className='invisible sm:visible text-center w-1/5 font-semibold text-s'>
                    ${item.price}
                  </span>
                  <span className='text-center w-1/5 font-semibold text-s'>
                    ${calcTotalPerItem(item.id)}
                  </span>
                </div> 
              ))}
            {items.length > 0 && <div className='flex justify-between border-b pb-8'>
            <Link to='/' className='flex font-semibold text-indigo-600 text-lg mt-8'>
              <svg className='fill-current mr-2 text-indigo-600 w-4' viewBox='0 0 448 512'>
                <path d='M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z' />
              </svg>
              Seguir Comprando
            </Link>
              <button onClick={clearItems} className='bg-indigo-500 font-semibold hover:bg-indigo-600 mt-5 py-3 p-5 text-s text-white uppercase'>Vaciar todo</button>
            </div>}
          </div>        
          <div id='summary' className='w-full lg:w-1/4 px-8 py-10 border border-solid p-4 border-slate-100 bg-slate-100'>
            <h1 className='font-semibold text-2xl border-b pb-8'>Resumen del pedido</h1>
            <div>
              <label className='inline-block mb-3 text-sm uppercase mt-7 font-semibold'>Envío</label>
              <select className='block p-2 text-gray-600 w-full text-sm '>
                <option>Envío gratis</option>
              </select>
            </div>
            <div className='py-8'>
              <label htmlFor='promo' className='font-semibold inline-block mb-3 text-sm uppercase'>Código Promocional</label>
              <input type='text' id='promo' placeholder='Enter your code' className='p-2 text-sm w-full' readOnly/>
            </div>
            <button className='bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase'>Aplicar</button>
            <div className='border-t mt-8 '>
              <div className='flex font-semibold justify-between py-6 text-lg uppercase'>
                <span>Costo total</span>
                <span>{calcTotal()}</span>
              </div>
              <div className="flex justify-center">
              <button
                onClick={() => createOrder()}
                className='bg-indigo-500 font-semibold hover:bg-indigo-600 py-4 lg:py-3 text-s text-white uppercase mx-auto px-8 lg:px-0 lg:w-full'
              >
                Comprar
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Cart; 

