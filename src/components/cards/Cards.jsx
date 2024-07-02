import React, {useEffect, useState} from 'react'
import axios from "../../api/index.js";

const Cards = () => {
    const [product, setProduct] = useState([])
    useEffect(() => {
        axios.get("/products")
            .then(res => setProduct(res.data.products))
            .catch(error => console.log(error))
    }, []);


    return (
        <div>
            <div></div>
            <div></div>
        </div>
    )
}
export default Cards
