import "./Cards.css"
import React, {useEffect, useReducer, useState} from 'react'
import axios from "../../api/index.js";
import {FaHeart} from "react-icons/fa";

const reducer = (state, action) => {
    switch (action.type) {
        case "AddToLike":
            return [...state, action.prduct]
        case "RemoveLikedProduct":
            return state.filter(product => product.id !== action.id)
        default:
            return state
    }
}

const Cards = () => {
    const [products, setProducts] = useState([])
    const initial = []
    const [state, dispatch] = useReducer(reducer, initial)

    useEffect(() => {
        axios.get("/products")
            .then(res => setProducts(res.data.products))
            .catch(error => console.log(error))
    }, []);

    const saveToLike = (prduct) => {
        dispatch({type: "AddToLike", prduct})
    }
    const removeLikedProduct = (id) => {
        dispatch({type: "RemoveLikedProduct", id})
    }

    return (
        <div className="wrapper">
            <div className="products">
                <h2>Products <span>{products.length}</span></h2>
                <div className="product">
                    {
                        products.map(product =>
                            <div key={product.id} className="card">
                                <div className="card-img">
                                    <img src={product.images[0]} alt={product.title}/>
                                </div>
                                <div className="card-body">
                                    <h4 className="title">{product.title}</h4>
                                    <p className="barnd"><b>Brand:</b> {product.brand}</p>
                                    <div className="card-bottom">
                                        <p className="price">${product.price}</p>
                                        <button onClick={() => saveToLike(product)} className="btn"><FaHeart/></button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="liked-products">
                <h2>Liked products <span>{state.length}</span></h2>
                <div className="liked-product">
                    {
                        state.map(product =>
                            <div key={product.id} className="card">
                                <div className="card-img">
                                    <img src={product.images[0]} alt={product.title}/>
                                </div>
                                <div className="card-body">
                                    <h4 className="title">{product.title}</h4>
                                    <p className="barnd"><b>Brand:</b> {product.brand}</p>
                                    <div className="card-bottom">
                                        <p className="price">${product.price}</p>
                                        <button onClick={() => removeLikedProduct(product.id)} className="liked-btn"><FaHeart/></button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
export default Cards
