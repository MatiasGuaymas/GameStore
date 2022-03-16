import { useEffect, useState } from "react";
import { collection, getDocs, where, query } from "firebase/firestore";
import Item from "./Item";
import { useParams } from "react-router-dom";
import db from "../utils/fireBaseConfig";

const ItemList = () => { //Manera de traer la lista de los productos de la base de datos de Firebase
    const [promiseResult, setPromiseResult] = useState([]);
    const { categoryID } = useParams();

    useEffect(() => { //Traer la info de los productos de la base de datos
        const firestoreFetch = async () => {
            if (categoryID === undefined) {
                const querySnapshot = await getDocs(collection(db, "Products"));
                return querySnapshot.docs.map(document => ({
                    id: document.id,
                    ...document.data()
                }))
            } else {
                const qProductos = query(collection(db, "Products"), where("categoryID", "==", parseInt(categoryID)))
                const querySnapshot = await getDocs(qProductos);
                return querySnapshot.docs.map(document => ({
                    id: document.id,
                    ...document.data()
                }))
            }
        }
        firestoreFetch()
            .then(result => setPromiseResult(result))
            .catch(error => console.log(error))
    }, [categoryID])

    return (
        <>
            {promiseResult &&
                promiseResult.map((product) => <Item product={product} key={product.id} />)}
        </>
    );
};

export default ItemList; 