import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProduct } from "../../services/fireStoreCRUD/fireStoreCRUD.js";
import { CartUpdater } from "../../components/CartUpdater/CartUpdater.jsx";
import styles from "./Product.module.scss";
import { userName } from "../../services/Cart/userName";

//this is the page that displays a larger image of the item and a description
const Product = () => {
    //"id" comes from the URL that has been requested
    const { id } = useParams();
    const [product, setProduct] = useState([]);

    //get the product object with that id from firebase
    const getData = async () => {
        const data = await getProduct(id);
        setProduct(data);
    };

    useEffect(() => {
        getData();
    }, []);

    //"quantity" is a function that is passed down to the "CartUpdater" components located on the "ProductCard" components. In this case it doesn't need to do anything when the item cart quantity is reduced to zero, so this is a function that does nothing. Hooray!
    const quantity = () => {};

    return (
        <div className={styles.productCard}>
            {product ? (
                <div>
                    <div className={styles.imageDescContainer}>
                        <img
                            src={product.imgURL}
                            alt=""
                            className={styles.image}
                        />
                        <div className={styles.description}>
                            <h2 className={styles.product_heading}>
                                {product.identifier}
                            </h2>
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
