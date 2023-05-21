import React, { Component } from "react";
import axios from "axios";

class App extends Component {
    state = {
        products: []
    };

    componentDidMount() {
        axios.get(process.env.REACT_APP_API_URL + "/findAvailableProducts?type=gadget").then(response => {
            this.setState({ products: response.data });
        });
    }

    render() {
        return (
            <div>
                <h1>Gadgets</h1>
                <ul>
                    {this.state.products.map(product => (
                        <li key={product.id}>
                            <p>
                              Product name
                            </p>
                            <p>
                              {product.name}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default App;