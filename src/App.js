import React from "react";
import styles from "./App.module.scss";
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
        <div className={styles.body}>
            <Router>
                <header>
                    <nav className="navBar">
                        <Link to="./Home">Home</Link>
                        <Link to="./Cart">Cart</Link>
                    </nav>
                </header>
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/home" />
                    </Route>
                    <Route exact path="/product/home">
                        <Redirect to="/Home" />
                    </Route>
                    <Route exact path="/product/cart">
                        <Redirect to="/Cart" />
                    </Route>
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
        </div>
    );
}

export default App;
