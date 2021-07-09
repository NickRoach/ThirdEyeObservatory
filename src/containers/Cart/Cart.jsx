import { useEffect, useState } from "react";
import styles from "./Cart.module.scss";
import { CartProductCard } from "../../components/CartProductCard/CartProductCard";
import {
    getCart,
    getProduct,
} from "../../services/fireStoreCRUD/fireStoreCRUD";
import { userName } from "../../services/Cart/userName";

const Cart = () => {
    const [cartProducts, setCartProducts] = useState([]);

    //returns an array of objects from the cart collection, each containing keys of productId and numberOf
    const getCartObjectArr = async () => {
        const cartObject = await getCart(userName);
        const prodArr = await cartObject.products;
        return prodArr;
    };

    //returns an array of product objects according to what was listed in the cart
    const getCartProductArr = async () => {
        const cartArr = await getCartObjectArr();
        const promiseArr = cartArr.map((entry) => {
            return getProduct(entry.productId);
        });
        const resolvedArray = await Promise.all(promiseArr);
        setCartProducts(resolvedArray);
    };

    useEffect(() => {
        getCartProductArr();
    }, []);

    //don't ask me to explain this. It just works. It triggers a re-render of the cart page when one of the cart item quantities is adjusted to zero
    const unMount = async () => {
        await getCartProductArr();
        getCartProductArr();
    };

    return (
        <div className={styles.cart}>
            <h2 className={styles.cart_heading}>Cart</h2>
            <div className={styles.cartDisplay}>
                {cartProducts.map((entry) => {
                    return (
                        <CartProductCard
                            product={entry}
                            key={entry.id}
                            userName={userName}
                            unMount={unMount}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Cart;
