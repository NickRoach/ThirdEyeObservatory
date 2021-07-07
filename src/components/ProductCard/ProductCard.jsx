import styles from "./ProductCard.module.scss";
import {
    addToCart,
    removeFromCart,
    getCart,
} from "../../services/fireStoreCRUD/fireStoreCRUD";
import { useEffect } from "react";

export const ProductCard = ({ product }) => {
    const addHandler = () => {
        addToCart(product.id, 1, "cart1");
    };

    const removeHandler = () => {
        removeFromCart(product.id, 1, "cart1");
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
                Add one to Cart
            </button>
            {/* <p>{numberInCart}</p> */}
            <button id="cardRemove" onClick={removeHandler}>
                Remove one from Cart
            </button>
        </div>
    );
};
export default ProductCard;
