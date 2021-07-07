import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProduct } from "../../services/fireStoreCRUD/fireStoreCRUD.js";

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
        <>
            {product ? (
                <div>
                    <h1>{product.identifier}</h1>
                    <h2>${product.unitPrice}</h2>
                    <img src={product.imgURL} alt="" />
                    <h4>Description:</h4>
                    <h5>{product.description}</h5>
                </div>
            ) : (
                <h2>Product not found :'(</h2>
            )}
        </>
    );
};

export default Product;
