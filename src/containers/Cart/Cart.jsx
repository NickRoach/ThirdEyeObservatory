import { useEffect, useState } from "react";
import styles from "./Cart.module.scss";
import { CartProductCard } from "../../components/CartProductCard/CartProductCard";
import {
    getCart,
    getProduct,
    addToCart,
} from "../../services/fireStoreCRUD/fireStoreCRUD";

const userName = "cart1"; //cart1 is a user identifier. It is hard coded for now, but would be dynamically assigned in a real application

const Cart = () => {
    const [cartArray, setCartArray] = useState([]);
    const [cartProducts, setCartProducts] = useState([]);

    //returns an array of objects from the cart collection, each containing keys of productId and numberOf
    const getCartObjectArr = async () => {
        const cartObject = await getCart(userName);
        const prodArr = await cartObject.products;
        // console.log("prodArr: ", prodArr);
        return prodArr;
    };

    const getCartProducts = async () => {
        const cartArr = await getCartObjectArr();
        setCartArray(cartArr);
    };

    const getCartProductArr = async () => {
        const promiseArr = cartArray.map((entry) => {
            return getProduct(entry.productId);
        });

        const resolvedArray = await Promise.all(promiseArr);
        // console.log("resolvedArray: ", await resolvedArray);
        setCartProducts(await resolvedArray);
    };

    useEffect(() => {
        getCartProducts();
        getCartProductArr();
    }, []);

    const runThis = () => {
        // console.log("cartArray[0].productId: ", cartArray[0].productId);
    };

    return (
        <div className={styles.cart}>
            <h2>This is the Cart page</h2>
            <div className={styles.cartDisplay}>
                {cartProducts.map((entry) => {
                    console.log(entry);
                    return (
                        <CartProductCard
                            product={entry}
                            key={entry.id}
                            userName={userName}
                        />
                    );
                })}
                {/* <button onClick={runThis}>Runthis</button> */}
                <br />
            </div>
        </div>
    );
};

export default Cart;
