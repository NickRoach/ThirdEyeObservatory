import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from "react-router-dom";
import Home from "./containers/Home";
import Cart from "./containers/Cart";
import Product from "./containers/Product";

function App() {
    return (
        <Router>
            <header>
                <nav className="navBar">
                    <Link to="./Home">Home</Link>
                    <Link to="./Cart">Cart</Link>
                </nav>
            </header>
            <Switch>
                <route exact path="/">
                    <Redirect to="/home" />
                </route>
                <route exact path="/product/home">
                    <Redirect to="/Home" />
                </route>
                <route exact path="/product/cart">
                    <Redirect to="/Cart" />
                </route>
                <Route exact path="/home">
                    <Home />
                </Route>
                <Route exact path="/cart">
                    <Cart />
                </Route>
                <Route path="/product/:id">
                    <Product />
                </Route>
            </Switch>
            <footer>
                <p>Copyright 2021</p>
            </footer>
        </Router>
    );
}

export default App;
