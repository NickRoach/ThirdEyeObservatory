import styles from "./ProductCard.module.scss";
import { addToCart } from "../../services/fireStoreCRUD/fireStoreCRUD";

export const ProductCard = ({ product }) => {
    const addHandler = () => {
        addToCart(product.id, 1, "cart1");
    };

    const removeHandler = () => {
        console.log("removeHandler called");
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
                Add to Cart
            </button>
            <button id="cardRemove" onClick={removeHandler}>
                Remove from Cart
            </button>
        </div>
    );
};
export default ProductCard;
