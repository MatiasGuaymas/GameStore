import ItemList from "./ItemList";
import { useState, useEffect } from "react";
import db from "../utils/fireBaseConfig";
import { collection, getDocs} from "firebase/firestore";
import Spinner from "./Spinner";

const ItemListContainer = () => {  //Contenedor con todos los productos, con su propio loader 
    const [Productos, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(async () => { //Loader de los productos
        setLoading(true);
        try {
        const querySnapshot = await getDocs(collection(db, "Products"));
          setItems(querySnapshot);
          setLoading(false);
        } catch (e) {  
        }
      }, []);
    return (  
        <div>
        {loading ? (
        <Spinner/>
        ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center container mx-auto my-5">
        <ItemList/> </div>  
      )}
    </div>
    )
}
export default ItemListContainer;
