import styles from "./CartProductCard.module.scss";
import CartUpdater from "../CartUpdater/CartUpdater.jsx";

import { getCart } from "../../services/fireStoreCRUD/fireStoreCRUD";
import { useEffect, useState, forceUpdate } from "react";
import { Link, useLocation } from "react-router-dom";

export const CartProductCard = ({ product, userName, unMount }) => {
    let [currentQuant, setCurrentQuant] = useState();

    const quantity = (x) => {
        if (x === 0) {
            unMount();
        }
        setCurrentQuant(x);
    };

    useEffect(() => {
        quantity(currentQuant);
    }, []);

    return (
        <div className={styles.card}>
            <div className={styles.container}>
                <div>
                    <Link to={`/product/${product.id}`}>
                        <img
                            src={product.imgURL}
                            alt=""
                            className={styles.productImage}
                        />
                    </Link>
                </div>

                <div className={styles.productName}>{product.identifier}</div>
                <div className={styles.price}>
                    Unit Price: ${product.unitPrice}
                </div>

                <div>
                    <CartUpdater
                        product={product}
                        userName={userName}
                        key={product.id}
                        quantity={quantity}
                    />
                </div>

                <div className={styles.totalPrice}>
                    Item cumulative price: ${currentQuant * product.unitPrice}
                </div>
            </div>
        </div>
    );
};
export default CartProductCard;
