import React, { Component } from "react";
import axios from "axios";

class App extends Component {
    state = {
        products: []
    };

    componentDidMount() {
        axios.get(process.env.REACT_APP_API_URL + "/findAvailableProducts?type=" + this.props.type).then(response => {
            return (
                this.setState({ products: response.data })
            )
        });
    }

    render() {
        const { products } = this.state;
        
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
}

export default App;