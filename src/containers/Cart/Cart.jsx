import { useEffect, useState } from "react";
import styles from "./Cart.module.scss";
import ProductCard from "../../components/ProductCard/ProductCard";
import {
    getCart,
    getProduct,
    addToCart,
} from "../../services/fireStoreCRUD/fireStoreCRUD";

const userName = "cart1"; //cart1 is a user identifier. It is hard coded for now, but would be dynamically assigned in a real application

const Cart = () => {
    const [cartEntries, setCartEntries] = useState([]);
    const [cartArray, setCartArray] = useState([]);

    //this downloads the cart, which is a list of objects, each containing a product ID and the numberOf that item
    const getCartEntries = async () => {
        const data = await getCart(userName);
        console.log(data);
        setCartEntries(data);
    };

    //I need to make an array which contains the product objects from the product collection that are referenced in the cart entries
    const getCartArray = async () => {
        // const promisesArr = cartEntries.map((entry) => {
        //     return getProduct(entry.productId);
        // });
        // const resolvedPromises = await Promise.all(promisesArr);
        // setCartArray(resolvedPromises);
    };

    useEffect(() => {
        getCartEntries(); //gets the cart objects, each of which contains a productId and the numberOf
    }, []);

    useEffect(() => {
        getCartArray(); //gets the product objects referenced in the cart object
    }, [cartEntries]);

    const runThis = () => {
        // addToCart(product.id);
        // setCartArray(cartArray);
        // console.log("cartArray", cartArray);
    };

    return (
        <div className={styles.cart}>
            <h2>This is the Cart page</h2>
            <div className={styles.cartDisplay}>
                {cartArray.map((product, index) => {
                    return (
                        <div key={product.id}>
                            <h3>NumberOf: {cartEntries[index].numberOf}</h3>
                            <h3>
                                Total price:{" "}
                                {cartEntries[index].numberOf *
                                    product.unitPrice}
                            </h3>
                            <ProductCard
                                product={product}
                                key={product.id}
                                userName={userName}
                            />
                        </div>
                    );
                })}
                <br />
            </div>
            <button onClick={runThis}>Run this</button>
        </div>
    );
};

export default Cart;
