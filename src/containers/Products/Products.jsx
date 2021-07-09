import styles from "./Products.module.scss";
import { useEffect, useState } from "react";
import { getProducts } from "../../services/fireStoreCRUD/fireStoreCRUD";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { userName } from "../../services/Cart/userName";

//not to be confused with the "Product" component. This is the home page that displays all the product cards
export const Products = () => {
    const [products, setProducts] = useState([]);
    const getData = async () => {
        const data = await getProducts();
        setProducts(data);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className={styles.products}>
            <h2 className={styles.products_heading}>
                Third Eye Observatory Astrophotography
            </h2>
            <div className={styles.display}>
                {products.map((product) => (
                    <ProductCard
                        product={product}
                        key={product.id}
                        userName={userName}
                    />
                ))}
            </div>
        </div>
    );
};

export default Products;
