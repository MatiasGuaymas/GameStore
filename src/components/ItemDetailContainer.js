import { useEffect, useState } from "react";
import { getDoc, doc, getDocs, collection } from "firebase/firestore";
import db from "../utils/fireBaseConfig";
import ItemDetail from "./ItemDetail";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";

const ItemDetailContainer = () => { //Contenedor de los detalles de un producto, con su propio loader
    const [data, setdata] = useState([]);
    const { id } = useParams();

    const [Productos, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(async () => { //Loader de los productos
        setLoading(true);
        try {
        const querySnapshots = await getDocs(collection(db, "Products"));
          setItems(querySnapshots);
          setLoading(false);
        } catch (e) {  
        }
      }, []);

    useEffect(() => { //Traer la info de los productos de la base de datos
        const firestoreFetch = async () => {
            const docRef = doc(db, "Products", id)
            const querySnapshot = await getDoc(docRef);
            const array = []
            array.push(querySnapshot.data())
            return array.map(document => ({
                id: id,
                ...document
            }))
        }
        firestoreFetch()
            .then(result => setdata(result[0]))
            .catch(error => console.log(error))
    }, [id]);
    

    return (
        <>
           
           <div>
        {loading ? (
        <Spinner/>
        ) : (
        <ItemDetail item={data} />
      )}
    </div>
        
        </>
    );
};

export default ItemDetailContainer; 