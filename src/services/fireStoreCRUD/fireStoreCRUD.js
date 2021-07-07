import firestore from "../FireStore";

export const getProduct = async (id) => {
    const col = firestore.collection("products");
    const ref = col.doc(id);
    const doc = await ref.get();

    if (!doc.exists) {
        return;
    }

    return { id: doc.id, ...doc.data() };
};

export const getProducts = async () => {
    const col = firestore.collection("products");
    const queryData = await col.get();
    const documents = queryData.docs;
    return documents.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getCart = async (userName) => {
    const col = firestore.collection("carts").doc(userName);
    const queryData = await col.get();
    const productsObject = { id: queryData.id, ...queryData.data() };
    return productsObject;
};

// update
export const addToCart = async (productId, numberOf, userName) => {
    // const col = firestore.collection("carts");
    //check if the item with that id is already in the cart

    const currentCart = await getCart(userName);
    const currentCartProducts = currentCart.products;
    console.log("currentCartProducts: ", currentCartProducts);

    const productObject = {
        productId: productId,
        numberOf: numberOf,
    };

    const newCartProductObjs = [...currentCartProducts, productObject];

    const newCart = {
        products: newCartProductObjs,
    };

    const col = firestore.collection("carts").doc(userName);
    await col.update(newCart);
};
