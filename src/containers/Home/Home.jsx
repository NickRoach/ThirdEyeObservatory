import styles from "./Home.module.scss";
import { useEffect, useState } from "react";
import { getProducts } from "../../services/fireStoreCRUD/fireStoreCRUD";
import { ProductCard } from "../../components/ProductCard/ProductCard";

const Home = () => {
    const [products, setProducts] = useState([]);
    const getData = async () => {
        const data = await getProducts();
        // console.log(data);
        setProducts(data);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <h2>This is the Home page</h2>
            <div className={styles.display}>
                {products.map((product) => (
                    <ProductCard product={product} key={product.id} />
                ))}
            </div>
        </>
    );
};

export default Home;
