import styles from "./CartProductCard.module.scss";
import {
    addToCart,
    getCart,
    removeFromCart,
} from "../../services/fireStoreCRUD/fireStoreCRUD";
import { useEffect, useState, useStateRef } from "react";
import { Link, useLocation } from "react-router-dom";

export const CartProductCard = ({ product, userName }) => {
    let [currentQuant, setCurrentQuant] = useState();

    const getQuantity = async () => {
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
        getQuantity();
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
                <Link to={`/product/${product.id}`}>
                    <img
                        src={product.imgURL}
                        alt=""
                        className={styles.productImage}
                    />
                </Link>
            </div>

            <button id="cardAdd" onClick={addHandler}>
                +
            </button>
            <p>Number in cart: {currentQuant}</p>
            <button id="cardRemove" onClick={removeHandler}>
                -
            </button>
        </div>
    );
};
export default CartProductCard;
