import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProduct } from "../../services/fireStoreCRUD/fireStoreCRUD.js";
import styles from "./Product.module.scss";

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const data = await getProduct(id);
            setProduct(data);
        };

        getData();
    }, [id]);

    return (
        <div className={styles.productCard}>
            {product ? (
                <div>
                    <h1>{product.identifier}</h1>
                    <h2>${product.unitPrice}</h2>
                    <img src={product.imgURL} alt="" className={styles.image} />
                    <h4>Description:</h4>
                    <h5>{product.description}</h5>
                </div>
            ) : (
                <h2>Product not found :'(</h2>
            )}
        </div>
    );
};

export default Product;
