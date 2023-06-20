import React, { Component, useEffect, useState } from "react";
import axios from "axios";

const App = ({type})=>{
    const [products, setProducts] = useState([])
        useEffect(() => {
            axios.get(process.env.REACT_APP_API_URL + "/findAvailableProducts?type=" + type).then(response => {
                return (
                  setProducts( response.data )
                ),100
            });
        }, [])
        return (
            <div>
                <h1>Gadgets</h1>
                {products.length === 0 ? (
                    <p>No Products found</p>
                ) : (
                    <ul>
                        {products.map((product) => (
                            <li key={product.id}>
                                <p>Product name</p>
                                <p>{product.name}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    }
//}

export default App;