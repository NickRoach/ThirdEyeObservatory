import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProduct } from "../../services/fireStoreCRUD/fireStoreCRUD.js";
import { CartUpdater } from "../../components/CartUpdater/CartUpdater.jsx";
import styles from "./Product.module.scss";
import { userName } from "../../services/Cart/userName";

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState([]);

    const getData = async () => {
        const data = await getProduct(id);
        setProduct(data);
    };

    useEffect(() => {
        getData();
    }, []);

    const quantity = () => {};

    return (
        <div className={styles.productCard}>
            {product ? (
                <div>
                    <h2 className={styles.product_heading}>
                        {product.identifier}
                    </h2>

                    <div className={styles.imageDescContainer}>
                        <img
                            src={product.imgURL}
                            alt=""
                            className={styles.image}
                        />
                        <div className={styles.description}>
                            <h4 className={styles.description_heading}>
                                Description:
                            </h4>
                            <h5 className={styles.description_content}>
                                {product.description}
                            </h5>
                            <div className={styles.priceAndQuant}>
                                <h2 className={styles.unitPrice}>
                                    ${product.unitPrice}
                                </h2>
                                <CartUpdater
                                    product={product}
                                    key={product.id}
                                    userName={userName}
                                    quantity={quantity}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <h2>Product not found :'(</h2>
            )}
        </div>
    );
};

export default Product;
