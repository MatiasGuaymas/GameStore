import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ItemCounter from "./ItemCount";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";

const ItemDetail = ({ item }) => { //Detalles del producto
    const [add, setAdd] = useState(true)

    const {addItem, items} = useContext(CartContext)

    useEffect(() => {
        if (items.length > 0 && items.some((i) => i.id === item.id)) {
            setAdd(false);
        }
    }, [items]);

  return (
    <div className="flex flex-col justify-center items-center md:flex-row md:items-start space-y-8 md:space-y-0 md:space-x-4 lg:space-x-8 max-w-6xl w-11/12 mx-auto mt-14 font-[Poppins]">
      <div className="w-full md:w-1/2 max-w-md border border-indigo-300 bg-white rounded shadow-lg"><div className="relative h-full">
       <img className="transform duration-500 ease-in-out hover:scale-105 h-full md:h-72 rounded" src={item.pictureURL} />
      </div></div>
      <div className="flex flex-col justify-between h-full w-full md:w-1/2 max-w-xs mx-auto space-y-4 min-h-128">
    <Link to="/"><a
        aria-label="back-to-products"
        className="border border-indigo-600 text-indigo-600 text-lg font-semibold pt-2 pb-1 leading-relaxed flex 
      justify-center items-center focus:ring-1 focus:ring-slate-100 focus:outline-none w-full hover:bg-slate-100 rounded-sm"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="w-4 mr-2 inline-flex" />
        Seguir Comprando
      </a></Link>
      <div className="font-primary">
      <h1 className="leading-relaxed font-extrabold text-3xl py-2 sm:py-1">
        {item.title}
      </h1>
      <p className="font-medium text-lg text-justify">
        {item.description}
      </p>
      <div className="text-xl text-indigo-700 font-bold pt-4 px-1">
        ${item.price}
      </div>
    </div>
    {
      add && (
        <div>
        <ItemCounter item={item} stock={item.stock} initial='1' addItem={addItem} />
        </div>
    )}
    {
      !add && (
        <Link to="/cart"><button type="button" className='inline-block rounded-sm font-medium border border-solid cursor-pointer text-center text-xl py-2 px-4 text- bg-indigo-400 border-indigo-400 hover:bg-indigo-600 hover:border-indigo-600 text-black hover:text-white mb-5'>Checkout</button></Link> //Terminar mi compra
    )}
    </div>
    </div> 
  )
}

export default ItemDetail; 


