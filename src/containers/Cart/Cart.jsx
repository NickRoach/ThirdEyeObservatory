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

    const getCartProductArr = async () => {
        const cartArr = await getCartObjectArr();
        const promiseArr = cartArr.map((entry) => {
            return getProduct(entry.productId);
        });
        const resolvedArray = await Promise.all(promiseArr);
        setCartProducts(resolvedArray);
    };

    useEffect(() => {
        getCartProductArr();
    }, []);

    return (
        <div className={styles.cart}>
            <h2 className={styles.cart_heading}>Cart</h2>
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
            </div>
        </div>
    );
};

export default Cart;
