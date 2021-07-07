import styles from "./Home.module.scss";
import { useEffect, useState } from "react";
import { getProducts } from "../../services/fireStoreCRUD/fireStoreCRUD";
import { ProductCard } from "../../components/ProductCard/ProductCard";

const userName = "cart1"; //cart1 is a user identifier. It is hard coded for now, but would be dynamically assigned in a real application

const Home = () => {
    const [products, setProducts] = useState([]);
    const getData = async () => {
        const data = await getProducts();
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
                    <ProductCard
                        product={product}
                        key={product.id}
                        userName={userName}
                    />
                ))}
            </div>
        </>
    );
};

export default Home;
