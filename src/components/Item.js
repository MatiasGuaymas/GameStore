import { Link } from 'react-router-dom';
 
const Item = ({ product }) => { //Carta de un Item o Producto
    const { id, title, price, pictureURL } = product;
    return (
        <div className="shadow-lg rounded-md bg-slate-200 overflow-hidden w-80 sm:w-full mt-5"> 
            <span className="hidden">{id}</span>
            <figure>
                <Link to={`/item/${id}`}><a href='#!'><img className='w-full h-52 sm:min-w-0' src={pictureURL} alt={title} /></a></Link>
            </figure>
            <div className="p-4 text-center text-lg font-[Poppins]">
            <Link to={`/item/${id}`}><span className='hover:text-blue-700'>{title}</span></Link>
            <Link to={`/item/${id}`}><p className="font-bold">${price}</p></Link></div>
        </div>
    );
};

export default Item; 
