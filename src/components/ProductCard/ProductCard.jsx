import styles from "./ProductCard.module.scss";
import {
    addToCart,
    getCart,
    removeFromCart,
} from "../../services/fireStoreCRUD/fireStoreCRUD";
import { useEffect, useState, useStateRef } from "react";

export const ProductCard = ({ product, userName }) => {
    let [currentQuant, setCurrentQuant] = useState();

    const updateCount = async () => {
        const productsObject = await getCart(userName);
        const products = productsObject.products;

        let currentAmount = 0;

        //get the current cart numberOf for the item with this id
        products.forEach((entry) => {
            if (entry.productId === product.id) {
                currentAmount = entry.numberOf;
            }
        });
        setCurrentQuant(currentAmount);
    };

    useEffect(() => {
        updateCount();
    }, []);

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
        // updateCount();
    };

    return (
        <div className={styles.card}>
            <div className={styles.productName}>{product.identifier}</div>
            <div className="price">${product.unitPrice}</div>
            <div>
                <img src={product.imgURL} alt="" />
            </div>
            <div className={styles.description}>{product.description}</div>

            <button id="cardAdd" onClick={addHandler}>
                Add one to cart
            </button>
            <p>Number in cart: {currentQuant}</p>
            <button id="cardRemove" onClick={removeHandler}>
                Remove one from cart
            </button>
        </div>
    );
};
export default ProductCard;
