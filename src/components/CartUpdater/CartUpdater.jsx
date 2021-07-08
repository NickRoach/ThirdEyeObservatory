import styles from "./CartUpdater.module.scss";
import {
    addToCart,
    getCart,
    removeFromCart,
} from "../../services/fireStoreCRUD/fireStoreCRUD";

import { useEffect, useState } from "react";

export const CartUpdater = ({ product, userName }) => {
    let [currentQuant, setCurrentQuant] = useState();
    const getQuantity = async () => {
        const productsObject = await getCart(userName);
        const products = productsObject.products;

        //get the current cart numberOf for the item with this id
        let currentAmount = 0;
        products.forEach((entry) => {
            if (entry.productId === product.id) {
                currentAmount = entry.numberOf;
            }
        });
        setCurrentQuant(currentAmount);
    };

    const addHandler = () => {
        setCurrentQuant(++currentQuant);
        addToCart(product.id, 1, userName);
        // updateCount();
    };

    const removeHandler = () => {
        if (currentQuant > 0) {
            setCurrentQuant(--currentQuant);
        }
        removeFromCart(product.id, 1, userName);
    };

    useEffect(() => {
        getQuantity();
    }, []);

    return (
        <div className={styles.cartUpdater}>
            <p>Quantity in cart</p>
            <button className={styles.button} onClick={removeHandler}>
                -
            </button>
            <p>{currentQuant}</p>

            <button className={styles.button} onClick={addHandler}>
                +
            </button>
        </div>
    );
};

export default CartUpdater;