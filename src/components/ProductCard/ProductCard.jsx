import styles from "./ProductCard.module.scss";
import {
    addToCart,
    getCart,
    removeFromCart,
} from "../../services/fireStoreCRUD/fireStoreCRUD";
import { useEffect, useState, useStateRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { CartUpdater } from "../../components/CartUpdater/CartUpdater.jsx";

export const ProductCard = ({ product, userName }) => {
    const quantity = () => {};

    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <Link to={`/product/${product.id}`}>
                    <img
                        src={product.imgURL}
                        alt=""
                        className={styles.productImage}
                    />
                </Link>
            </div>
            <div className={styles.productName}>{product.identifier}</div>

            <div className={styles.price}>Unit price: ${product.unitPrice}</div>

            <CartUpdater
                product={product}
                userName={userName}
                quantity={quantity}
            />
        </div>
    );
};
export default ProductCard;
