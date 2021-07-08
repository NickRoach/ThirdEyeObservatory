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

    return (
        <div className={styles.productCard}>
            {product ? (
                <div>
                    <h1 className={styles.product_heading}>
                        {product.identifier}
                    </h1>

                    <div className={styles.imageDescContainer}>
                        <img
                            src={product.imgURL}
                            alt=""
                            className={styles.image}
                        />
                        <div>
                            <h4>Description:</h4>
                            <h5>{product.description}</h5>
                            <h2>${product.unitPrice}</h2>
                            <CartUpdater
                                product={product}
                                key={product.id}
                                userName={userName}
                            />
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
