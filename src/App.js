import React from "react";
import styles from "./App.module.scss";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from "react-router-dom";
import Products from "./containers/Products";
import Cart from "./containers/Cart";
import Product from "./containers/Product";

function App() {
    return (
        <div className={styles.body}>
            <Router basename="/index.html">
                <header>
                    <nav className={styles.navBar}>
                        <Link to="./Products" className={styles.navBar_link}>
                            Products
                        </Link>
                        <Link to="./Cart" className={styles.navBar_link}>
                            Cart
                        </Link>
                    </nav>
                </header>
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/Products" />
                    </Route>
                    <Route exact path="/product/products">
                        <Redirect to="/Products" />
                    </Route>
                    <Route exact path="/product/cart">
                        <Redirect to="/Cart" />
                    </Route>
                    <Route exact path="/Products">
                        <Products />
                    </Route>
                    <Route exact path="/cart">
                        <Cart />
                    </Route>
                    <Route path="/product/:id">
                        <Product />
                    </Route>
                </Switch>
                <footer className={styles.footer}>
                    <p>Copyright 2021</p>
                </footer>
            </Router>
        </div>
    );
}

export default App;
