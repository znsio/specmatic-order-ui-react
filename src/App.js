import React, { Component, useEffect, useState } from "react"
import axios from "axios"

const App = ({ type }) => {
    const [products, setProducts] = useState([])
    const [error, setError] = useState('')
    useEffect(() => {
        const apiCal = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_API_URL + "/findAvailableProducts?type=" + type, { timeout: 1000 })
                setProducts(response.data)
            } catch {
                setError('Timeout! Please try again...')
            }
        }
        apiCal()
    }, [])
    return (
        <div>
            <h1>Gadgets</h1>
            {error === "" ? (
                <>
                {
                    products.length === 0 ? (
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
                    )
                }</>
            ) : (error)
            }
        </div>
    )
}

export default App