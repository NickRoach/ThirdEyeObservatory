import styles from "./CartUpdater.module.scss";
import {
    addToCart,
    getCart,
    removeFromCart,
} from "../../services/fireStoreCRUD/fireStoreCRUD";
import { useEffect, useState } from "react";

//this component allows you to adjust the number of a given item in the cart wherever it is placed
export const CartUpdater = ({ product, userName, quantity }) => {
    let [currentQuant, setCurrentQuant] = useState();

    //get the current cart quantity of the item from firebase
    const getQuantity = async () => {
        //get the whole cart object for this user
        const productsObject = await getCart(userName);
        const products = productsObject.products;

        //get the current cart numberOf for the item with this id
        let currentAmount = 0;
        products.forEach((entry) => {
            if (entry.productId === product.id) {
                currentAmount = entry.numberOf;
            }
        });
        //this function "quantity" belongs to a parent component and can be used to trigger a re-render when the cart quantity reaches zero
        quantity(currentAmount);
        setCurrentQuant(currentAmount);
    };

    //when the + button is clicked
    const addHandler = (event) => {
        setCurrentQuant(++currentQuant);
        quantity(currentQuant);

        // updateFirebase
        addToCart(product.id, 1, userName);
    };

    //when the - button is clicked
    const removeHandler = (event) => {
        //only decrement it if it's not already zero
        if (currentQuant > 0) {
            setCurrentQuant(--currentQuant);
            //send the quantity to the parent component in "quantity"
            quantity(currentQuant);
        }
        // update firebase
        removeFromCart(product.id, 1, userName);
    };

    useEffect(() => {
        getQuantity();
    }, []);

    return (
        <div className={styles.cartUpdater}>
            <p className={styles.quantity}>Quantity</p>
            <button className={styles.button} onClick={removeHandler}>
                -
            </button>
            <p className={styles.currentQuant}>{currentQuant}</p>

            <button className={styles.button} onClick={addHandler}>
                +
            </button>
        </div>
    );
};

export default CartUpdater;
