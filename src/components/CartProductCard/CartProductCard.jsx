import styles from "./CartProductCard.module.scss";
import CartUpdater from "../CartUpdater/CartUpdater.jsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//this card displays each product on the cart page
export const CartProductCard = ({ product, userName, unMount }) => {
    let [currentQuant, setCurrentQuant] = useState();

    //this is to trigger a re-render when the quantity of the item is adjusted to zero
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
