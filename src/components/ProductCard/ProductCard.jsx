import styles from "./ProductCard.module.scss";
import { Link } from "react-router-dom";
import { CartUpdater } from "../../components/CartUpdater/CartUpdater.jsx";

//these cards display the products on the "produts" page
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
            <div className={styles.priceAndCartUD}>
                <div className={styles.price}>
                    Unit price: ${product.unitPrice}
                </div>

                <CartUpdater
                    product={product}
                    userName={userName}
                    quantity={quantity}
                />
            </div>
        </div>
    );
};
export default ProductCard;
